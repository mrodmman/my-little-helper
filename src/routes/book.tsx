import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

const BLUE = '#1763ff';
const BG_IMAGE = 'https://images.unsplash.com/photo-1527498913931-c302284a62d7?auto=format&fit=crop&w=1800&q=80';

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
    const res = await fetch('/api/booking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: isoDate, time: selected, name, email, phone, notes }),
    });
    const data = await res.json();
    setMessage(data.message || data.error || 'Done');
  }

  return (
    <main className="min-h-screen bg-[#030814] text-white" style={{ fontFamily: 'Inter,system-ui,sans-serif' }}>
      <div className="relative min-h-screen overflow-hidden">
        <img src={BG_IMAGE} alt="Booking background" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040b19]/95 via-[#030814]/90 to-[#030814]" />

        <div className="relative mx-auto max-w-6xl p-4 md:p-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92]">
            Book your <span style={{ color: BLUE }}>strategy</span> call
          </h1>
          <p className="mt-3 text-lg text-white/80">Pick a time that works for you. Submit your details to confirm instantly.</p>

          <div className="mt-8 rounded-3xl border border-blue-500/30 bg-[#081122]/75 backdrop-blur p-4 md:p-6 grid gap-6 lg:grid-cols-2">
            <section>
              <h2 className="text-2xl font-extrabold">1 • Choose a date & time</h2>
              <p className="text-sm text-white/70">All times shown in your local timezone.</p>
              <div className="mt-4 rounded-2xl border border-blue-400/20 bg-black/20 p-3">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border-0" />
              </div>

              <p className="mt-4 font-bold uppercase text-sm">Available times • {date ? format(date, 'EEEE, MMM d, yyyy') : 'Select date'}</p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelected(t)}
                    className="rounded-xl border border-blue-500 px-3 py-2 font-extrabold transition"
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
                <input placeholder="Full Name" className="w-full rounded-xl bg-[#07101f] p-3 border border-blue-500/30" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Email" className="w-full rounded-xl bg-[#07101f] p-3 border border-blue-500/30" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Phone (optional)" className="w-full rounded-xl bg-[#07101f] p-3 border border-blue-500/30" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <textarea placeholder="What would you like help with?" className="w-full rounded-xl bg-[#07101f] p-3 border border-blue-500/30 min-h-28" value={notes} onChange={(e) => setNotes(e.target.value)} />

                <div className="rounded-2xl border border-blue-500/30 p-4 bg-black/20">
                  <h3 className="font-extrabold text-blue-400">BOOKING SUMMARY</h3>
                  <p className="mt-2 text-sm text-white/80">Date: {date ? format(date, 'EEEE, MMM d, yyyy') : '—'}</p>
                  <p className="text-sm text-white/80">Time: {selected || '—'}</p>
                  <p className="text-sm text-white/80">Duration: 60 minutes</p>
                  <p className="text-sm text-white/80">Type: Strategy Call</p>
                </div>

                <button onClick={submit} className="w-full rounded-xl px-4 py-3 text-xl font-extrabold" style={{ background: BLUE }}>
                  CONFIRM BOOKING
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
