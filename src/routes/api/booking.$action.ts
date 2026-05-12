import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { getAdminSession } from '@/lib/session';

const MEET_LINK = 'https://meet.google.com/ohf-nmom-pva';

function json(data: unknown, status = 200) { return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } }); }

function errorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

type Settings = {
  availabilityMode?: 'rules' | 'allowlist';
  workingDays: number[];
  blackoutDates: string[];
  dailyTimeBlocks: { weekday: number; time: string }[];
  dateTimeBlocks: { date: string; time: string }[];
  allowedDateTimes?: { date: string; time: string }[];
};

function slotsForDate(date: string, settings: Settings) {
  if (settings.availabilityMode === 'allowlist') {
    return (settings.allowedDateTimes ?? [])
      .filter((x) => x.date === date)
      .map((x) => x.time)
      .sort();
  }
  const d = new Date(`${date}T00:00:00`);
  if (!settings.workingDays.includes(d.getDay()) || settings.blackoutDates.includes(date)) return [] as string[];
  const slots: string[] = [];
  for (let h = 9; h <= 16; h++) if (h !== 12) slots.push(`${String(h).padStart(2, '0')}:00`);
  const recurring = new Set(settings.dailyTimeBlocks.filter((x) => x.weekday === d.getDay()).map((x) => x.time));
  const specific = new Set(settings.dateTimeBlocks.filter((x) => x.date === date).map((x) => x.time));
  return slots.filter((s) => !recurring.has(s) && !specific.has(s));
}


async function addColumnIfMissing(env: ReturnType<typeof getEnv>, columnDef: string) {
  try {
    await env.DB.prepare(`ALTER TABLE booking_settings ADD COLUMN ${columnDef}`).run();
  } catch {
    // ignore if column already exists
  }
}

async function ensureBookingSettingsSchema(env: ReturnType<typeof getEnv>) {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS booking_settings (
    id INTEGER PRIMARY KEY,
    working_days TEXT,
    blackout_dates TEXT,
    daily_time_blocks TEXT,
    date_time_blocks TEXT,
    updated_at TEXT
  )`).run();

  await addColumnIfMissing(env, `working_days TEXT NOT NULL DEFAULT '[1,2,3,4,5]'`);
  await addColumnIfMissing(env, `blackout_dates TEXT NOT NULL DEFAULT '[]'`);
  await addColumnIfMissing(env, `daily_time_blocks TEXT NOT NULL DEFAULT '[]'`);
  await addColumnIfMissing(env, `date_time_blocks TEXT NOT NULL DEFAULT '[]'`);
  await addColumnIfMissing(env, `updated_at TEXT`);

  await env.DB.prepare(`INSERT INTO booking_settings (id, working_days, blackout_dates, daily_time_blocks, date_time_blocks, updated_at)
    VALUES (1, '[1,2,3,4,5]', '[]', '[]', '[]', datetime('now'))
    ON CONFLICT(id) DO NOTHING`).run();
}

function parseSettingsRow(row: any): Settings {
  const rawBlackout = JSON.parse(row?.blackout_dates ?? '[]') as string[];
  const availabilityMode: 'rules' | 'allowlist' = rawBlackout.includes('__MODE_ALLOWLIST__') ? 'allowlist' : 'rules';
  const blackoutDates = rawBlackout.filter((d) => d !== '__MODE_ALLOWLIST__');
  const dateTimeBlocks = JSON.parse(row?.date_time_blocks ?? '[]') as { date: string; time: string }[];
  return {
    availabilityMode,
    workingDays: JSON.parse(row?.working_days ?? '[1,2,3,4,5]'),
    blackoutDates,
    dailyTimeBlocks: JSON.parse(row?.daily_time_blocks ?? '[]'),
    dateTimeBlocks,
    allowedDateTimes: availabilityMode === 'allowlist' ? dateTimeBlocks : [],
  };
}

type SmsResult = { ok: boolean; reason?: string };

async function sendSms(env: ReturnType<typeof getEnv>, to: string, body: string): Promise<SmsResult> {
  if (!to) return { ok: false, reason: 'No phone number provided' };

  if (env.CLICKSEND_USERNAME && env.CLICKSEND_API_KEY) {
    const res = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${env.CLICKSEND_USERNAME}:${env.CLICKSEND_API_KEY}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ source: 'cloudflare-worker', body, to, from: env.CLICKSEND_FROM || 'Kraken' }],
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, reason: `ClickSend ${res.status}${detail ? `: ${detail}` : ''}` };
    }
    return { ok: true };
  }

  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_FROM_NUMBER) {
    return { ok: false, reason: 'No SMS provider configured' };
  }
  const form = new URLSearchParams({ To: to, From: env.TWILIO_FROM_NUMBER, Body: body });
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, { method: 'POST', headers: { Authorization: `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: form });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return { ok: false, reason: `Twilio ${res.status}${detail ? `: ${detail}` : ''}` };
  }
  return { ok: true };
}

async function sendTelegram(env: ReturnType<typeof getEnv>, text: string) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
  });
}

export const Route = createFileRoute('/api/booking/$action')({
  server: { handlers: {
    GET: async ({ params, request }) => {
      const env = getEnv();
      if (params.action === 'admin-settings') {
        try {
          const pass = request.headers.get('x-admin-password');
          const adminSession = getAdminSession();
          if (pass !== env.ADMIN_SECRET && adminSession !== env.ADMIN_SECRET) return json({ error: 'Unauthorized' }, 401);
          await ensureBookingSettingsSchema(env);
          const row = await env.DB.prepare('SELECT working_days, blackout_dates, daily_time_blocks, date_time_blocks FROM booking_settings WHERE id=1').first<any>();
          return json({ settings: parseSettingsRow(row) });
        } catch (err) {
          return json({ error: `Admin settings GET failed: ${errorMessage(err)}` }, 500);
        }
      }
      if (params.action === 'availability') {
        const date = new URL(request.url).searchParams.get('date') || new Date().toISOString().slice(0, 10);
        await ensureBookingSettingsSchema(env);
        const row = await env.DB.prepare('SELECT working_days, blackout_dates, daily_time_blocks, date_time_blocks FROM booking_settings WHERE id=1').first<any>();
        const settings: Settings = parseSettingsRow(row);
        const daySlots = slotsForDate(date, settings);
        const busy = await env.DB.prepare("SELECT starts_at FROM bookings WHERE status='Confirmed' AND starts_at >= ? AND starts_at < ?").bind(`${date}T00:00:00.000Z`, `${date}T23:59:59.999Z`).all<{ starts_at: string }>();
        const busySet = new Set((busy.results ?? []).map((x) => x.starts_at.slice(11, 16)));
        return json({ slots: daySlots.filter((s) => !busySet.has(s)) });
      }
      if (params.action === 'cancel') {
        const id = new URL(request.url).searchParams.get('id');
        if (!id) return json({ error: 'id required' }, 400);
        await env.DB.prepare("UPDATE bookings SET status='Cancelled' WHERE booking_id=?").bind(id).run();
        return json({ message: 'Booking cancelled and slot reopened.' });
      }
      return json({ error: 'Not found' }, 404);
    },
    POST: async ({ params, request }) => {
      const env = getEnv();
      if (params.action === 'admin-settings') {
        try {
          const pass = request.headers.get('x-admin-password');
          const adminSession = getAdminSession();
          if (pass !== env.ADMIN_SECRET && adminSession !== env.ADMIN_SECRET) return json({ error: 'Unauthorized' }, 401);
          await ensureBookingSettingsSchema(env);
          const body = (await request.json()) as Settings;
        const merged: Settings = {
          availabilityMode: body.availabilityMode ?? 'rules',
          workingDays: body.workingDays ?? [1, 2, 3, 4, 5],
          blackoutDates: body.blackoutDates ?? [],
          dailyTimeBlocks: body.dailyTimeBlocks ?? [],
          dateTimeBlocks: body.dateTimeBlocks ?? [],
          allowedDateTimes: body.allowedDateTimes ?? [],
        };
        const blackoutForSave = merged.availabilityMode === 'allowlist' ? [...merged.blackoutDates, '__MODE_ALLOWLIST__'] : merged.blackoutDates;
        const dateTimeForSave = merged.availabilityMode === 'allowlist' ? (merged.allowedDateTimes ?? []) : merged.dateTimeBlocks;
        await env.DB.prepare("INSERT INTO booking_settings (id,working_days,blackout_dates,daily_time_blocks,date_time_blocks,updated_at) VALUES (1,?,?,?,?,datetime('now')) ON CONFLICT(id) DO UPDATE SET working_days=excluded.working_days, blackout_dates=excluded.blackout_dates, daily_time_blocks=excluded.daily_time_blocks, date_time_blocks=excluded.date_time_blocks, updated_at=datetime('now')").bind(JSON.stringify(merged.workingDays), JSON.stringify(blackoutForSave), JSON.stringify(merged.dailyTimeBlocks), JSON.stringify(dateTimeForSave)).run();
        return json({ ok: true });
        } catch (err) {
          return json({ error: `Admin settings POST failed: ${errorMessage(err)}` }, 500);
        }
      }
      if (params.action === 'create') {
        const body = await request.json() as { date: string; time: string; name: string; email: string; phone?: string; notes?: string };
        if (!body.date || !body.time || !body.name || !body.email) return json({ error: 'Missing required fields' }, 400);
        const bookingId = crypto.randomUUID();
        const startsAt = `${body.date}T${body.time}:00.000Z`;
        const endsAt = `${body.date}T${String(Number(body.time.slice(0, 2)) + 1).padStart(2, '0')}:00:00.000Z`;
        const existing = await env.DB.prepare("SELECT id FROM bookings WHERE starts_at=? AND status='Confirmed'").bind(startsAt).first();
        if (existing) return json({ error: 'Slot already booked' }, 409);
        await env.DB.prepare("INSERT INTO bookings (booking_id,name,email,phone,notes,starts_at,ends_at,status) VALUES (?,?,?,?,?,?,?,'Confirmed')").bind(bookingId, body.name, body.email, body.phone ?? '', body.notes ?? '', startsAt, endsAt).run();
        const cancelLink = `${new URL(request.url).origin}/cancel?id=${bookingId}`;
        const userMsg = `Hi ${body.name}, your call is confirmed for ${body.date} ${body.time}. Meet link: ${MEET_LINK}. To cancel or reschedule: ${cancelLink}`;
        const ownerMsg = `New Booking! ${body.name} on ${body.date} ${body.time}. Link to manage: ${new URL(request.url).origin}/admin/availability`;
        const customerSms = await sendSms(env, body.phone ?? '', userMsg);
        if (env.OWNER_PHONE_NUMBER) await sendSms(env, env.OWNER_PHONE_NUMBER, ownerMsg);
        await sendTelegram(env, ownerMsg);
        return json({
          bookingId,
          message: customerSms.ok
            ? `Booked! Confirmation sent by text. ${userMsg}`
            : `Booked! We could not send your text confirmation (${customerSms.reason ?? 'unknown reason'}).`,
          sms: customerSms,
        });
      }
      return json({ error: 'Not found' }, 404);
    },
  } },
});
