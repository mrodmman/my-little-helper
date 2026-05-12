import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

const BLUE = '#1763ff';
const PRIMARY_BG_IMAGE = 'https://i.ibb.co/g1GKLtj/file-51.jpg';
const SECONDARY_BG_IMAGE = 'https://i.ibb.co/tTgxPHM9/file-50.jpg';
const FALLBACK_BG_IMAGE = '/images/booking-bg.jpg';

export const Route = createFileRoute('/book')({ component: BookPage });

function BookPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [times, setTimes] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bgImage, setBgImage] = useState(PRIMARY_BG_IMAGE);

  const isoDate = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date]);

  useEffect(() => {
    if (!isoDate) return;
    void fetch(`/api/booking/availability?date=${isoDate}`).then(async (r) => {
      const data = await r.json();
      setTimes(data.slots ?? []);
      setSelected('');
    });
  }, [isoDate]);

  async function submit() {
    if (!isoDate || !selected) return setMessage('Please select a date and time slot first.');
    if (!name.trim() || !email.trim()) return setMessage('Please enter your name and email first.');
    setSubmitting(true);
    setMessage('Submitting your booking...');
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: isoDate, time: selected, name, email, phone, notes }),
      });
      const data = await res.json();
      setMessage(data.message || data.error || 'Done');
      if (res.ok) {
        setSelected('');
      }
    } catch {
      setMessage('Booking request failed. Please retry.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'Inter,system-ui,sans-serif' }}>
      <div className="relative min-h-screen overflow-hidden">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          onError={() => {
            setBgImage((current) => {
              if (current === PRIMARY_BG_IMAGE) return SECONDARY_BG_IMAGE;
              if (current === SECONDARY_BG_IMAGE) return FALLBACK_BG_IMAGE;
              return current;
            });
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040b19]/45 via-[#030814]/40 to-[#030814]/55" />

        <div className="relative mx-auto max-w-6xl p-4 md:p-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92]">
            Book your <span style={{ color: BLUE }}>strategy</span> call
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">Pick a time that works for you. Submit your details to confirm instantly.</p>

          <div className="mt-8 rounded-3xl border border-border bg-surface/75 backdrop-blur p-4 md:p-6 grid gap-6 lg:grid-cols-2">
            <section>
              <h2 className="text-2xl font-extrabold">1 • Choose a date & time</h2>
              <p className="text-sm text-muted-foreground">All times shown in your local timezone.</p>
              <div className="mt-4 rounded-2xl border border-border bg-background/30 p-3">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border-0" />
              </div>

              <p className="mt-4 font-bold uppercase text-sm">Available times • {date ? format(date, 'EEEE, MMM d, yyyy') : 'Select date'}</p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelected(t)}
                    className="rounded-xl border border-border px-3 py-2 font-extrabold transition"
                    style={{ background: selected === t ? BLUE : 'rgba(0,0,0,0.25)' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold">2 • Your details</h2>
              <div className="space-y-3 mt-4">
                <input placeholder="Full Name" className="w-full rounded-xl bg-background/40 p-3 border border-border" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Email" className="w-full rounded-xl bg-background/40 p-3 border border-border" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Phone (optional)" className="w-full rounded-xl bg-background/40 p-3 border border-border" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <textarea placeholder="What would you like help with?" className="w-full rounded-xl bg-background/40 p-3 border border-border min-h-28" value={notes} onChange={(e) => setNotes(e.target.value)} />

                <div className="rounded-2xl border border-border p-4 bg-background/30">
                  <h3 className="font-extrabold text-blue-400">BOOKING SUMMARY</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Date: {date ? format(date, 'EEEE, MMM d, yyyy') : '—'}</p>
                  <p className="text-sm text-muted-foreground">Time: {selected || '—'}</p>
                  <p className="text-sm text-muted-foreground">Duration: 60 minutes</p>
                  <p className="text-sm text-muted-foreground">Type: Strategy Call</p>
                </div>

                <button onClick={submit} disabled={!selected || submitting} className="w-full rounded-xl px-4 py-3 text-xl font-extrabold text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: BLUE }}>
                  {submitting ? 'BOOKING...' : 'CONFIRM BOOKING'}
                </button>
                {!!message && <p className="text-sm text-blue-300">{message}</p>}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
