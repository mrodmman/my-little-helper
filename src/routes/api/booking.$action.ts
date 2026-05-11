import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';

const MEET_LINK = 'https://meet.google.com/[MY-STATIC-CODE]';

function json(data: unknown, status = 200) { return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } }); }

function slotsForDate(date: string, workingDays: number[], blackoutDates: string[]) {
  const d = new Date(`${date}T00:00:00`);
  if (!workingDays.includes(d.getDay()) || blackoutDates.includes(date)) return [] as string[];
  const slots: string[] = [];
  for (let h = 9; h <= 16; h++) { if (h !== 12) slots.push(`${String(h).padStart(2,'0')}:00`); }
  return slots;
}

async function sendSms(env: ReturnType<typeof getEnv>, to: string, body: string) {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_FROM_NUMBER || !to) return;
  const form = new URLSearchParams({ To: to, From: env.TWILIO_FROM_NUMBER, Body: body });
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  });
}

export const Route = createFileRoute('/api/booking/$action')({
  server: { handlers: {
    GET: async ({ params, request }) => {
      const env = getEnv();
      if (params.action === 'availability') {
        const date = new URL(request.url).searchParams.get('date') || new Date().toISOString().slice(0, 10);
        const settings = await env.DB.prepare('SELECT working_days, blackout_dates FROM booking_settings WHERE id=1').first<{working_days:string; blackout_dates:string}>();
        const workingDays = JSON.parse(settings?.working_days ?? '[1,2,3,4,5]') as number[];
        const blackouts = JSON.parse(settings?.blackout_dates ?? '[]') as string[];
        const daySlots = slotsForDate(date, workingDays, blackouts);
        const busy = await env.DB.prepare("SELECT starts_at FROM bookings WHERE status='Confirmed' AND starts_at >= ? AND starts_at < ?").bind(`${date}T00:00:00.000Z`, `${date}T23:59:59.999Z`).all<{starts_at:string}>();
        const busySet = new Set((busy.results ?? []).map(x => x.starts_at.slice(11,16)));
        return json({ slots: daySlots.filter(s => !busySet.has(s)) });
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
      if (params.action === 'admin/settings') {
        const pass = request.headers.get('x-admin-password');
        if (pass !== env.ADMIN_SECRET) return json({ error: 'Unauthorized' }, 401);
        const body = await request.json() as { workingDays: number[]; blackoutDates: string[] };
        await env.DB.prepare('INSERT INTO booking_settings (id,working_days,blackout_dates,updated_at) VALUES (1,?,?,datetime(\'now\')) ON CONFLICT(id) DO UPDATE SET working_days=excluded.working_days, blackout_dates=excluded.blackout_dates, updated_at=datetime(\'now\')').bind(JSON.stringify(body.workingDays ?? [1,2,3,4,5]), JSON.stringify(body.blackoutDates ?? [])).run();
        return json({ ok: true });
      }
      if (params.action === 'create') {
        const body = await request.json() as { date: string; time: string; name: string; email: string; phone?: string; notes?: string };
        if (!body.date || !body.time || !body.name || !body.email) return json({ error: 'Missing required fields' }, 400);
        const bookingId = crypto.randomUUID();
        const startsAt = `${body.date}T${body.time}:00.000Z`;
        const endsAt = `${body.date}T${String(Number(body.time.slice(0,2))+1).padStart(2,'0')}:00:00.000Z`;
        const existing = await env.DB.prepare("SELECT id FROM bookings WHERE starts_at=? AND status='Confirmed'").bind(startsAt).first();
        if (existing) return json({ error: 'Slot already booked' }, 409);
        await env.DB.prepare('INSERT INTO bookings (booking_id,name,email,phone,notes,starts_at,ends_at,status) VALUES (?,?,?,?,?,?,?,\'Confirmed\')').bind(bookingId, body.name, body.email, body.phone ?? '', body.notes ?? '', startsAt, endsAt).run();
        const cancelLink = `${new URL(request.url).origin}/cancel?id=${bookingId}`;
        const userMsg = `Hi ${body.name}, your call is confirmed for ${body.date} ${body.time}. Meet link: ${MEET_LINK}. To cancel or reschedule: ${cancelLink}`;
        const ownerMsg = `New Booking! ${body.name} on ${body.date} ${body.time}. Link to manage: ${new URL(request.url).origin}/admin/availability`;
        await sendSms(env, body.phone ?? '', userMsg);
        if (env.OWNER_PHONE_NUMBER) await sendSms(env, env.OWNER_PHONE_NUMBER, ownerMsg);
        return json({ bookingId, message: `${userMsg}` });
      }
      return json({ error: 'Not found' }, 404);
    },
  } },
});
