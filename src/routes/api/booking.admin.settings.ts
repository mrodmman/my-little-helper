import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { getAdminSession } from '@/lib/session';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

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

export const Route = createFileRoute('/api/booking/admin/settings')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const env = getEnv();
          const pass = request.headers.get('x-admin-password');
          const adminSession = getAdminSession();
          if (pass !== env.ADMIN_SECRET && adminSession !== env.ADMIN_SECRET) return json({ error: 'Unauthorized' }, 401);
          await ensureBookingSettingsSchema(env);
          const row = await env.DB.prepare('SELECT working_days, blackout_dates, daily_time_blocks, date_time_blocks FROM booking_settings WHERE id=1').first<any>();
          return json({ settings: parseSettingsRow(row) });
        } catch (err) {
          return json({ error: `Admin settings GET failed: ${errorMessage(err)}` }, 500);
        }
      },
      POST: async ({ request }) => {
        try {
          const env = getEnv();
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
      },
    },
  },
});
