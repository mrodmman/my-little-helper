import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

const BLUE = '#1763ff';

export const Route = createFileRoute('/book')({ component: BookPage });

function BookPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [times, setTimes] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    void fetch(`/api/booking/availability?date=${date}`).then(async (r) => {
      const data = await r.json();
      setTimes(data.slots ?? []);
      setSelected('');
    });
  }, [date]);

  async function submit() {
    const res = await fetch('/api/booking/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date, time: selected, name, email, phone, notes }) });
    const data = await res.json();
    setMessage(data.message || data.error || 'Done');
  }

  return <main className="min-h-screen bg-[#030814] text-white p-4 md:p-10" style={{fontFamily:'Inter,system-ui,sans-serif'}}>
    <div className="mx-auto max-w-6xl rounded-3xl border border-blue-500/30 bg-black/30 p-4 md:p-8">
      <h1 className="text-5xl font-black uppercase leading-none">Book your <span style={{color:BLUE}}>strategy</span> call</h1>
      <p className="mt-3 text-white/80">Pick a time that works for you.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-blue-500/30 p-4">
          <h2 className="text-2xl font-extrabold">1 • Choose a date & time</h2>
          <input type="date" className="mt-4 w-full rounded-xl bg-[#07101f] p-3" value={date} onChange={e=>setDate(e.target.value)} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {times.map(t=><button key={t} onClick={()=>setSelected(t)} className="rounded-xl border border-blue-500 px-3 py-2 font-bold" style={{background:selected===t?BLUE:'transparent'}}>{t}</button>)}
          </div>
        </section>
        <section className="rounded-2xl border border-blue-500/30 p-4">
          <h2 className="text-2xl font-extrabold">2 • Your details</h2>
          <div className="space-y-3 mt-4">
            <input placeholder="Full Name" className="w-full rounded-xl bg-[#07101f] p-3" value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Email" className="w-full rounded-xl bg-[#07101f] p-3" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Phone" className="w-full rounded-xl bg-[#07101f] p-3" value={phone} onChange={e=>setPhone(e.target.value)} />
            <textarea placeholder="How can I help?" className="w-full rounded-xl bg-[#07101f] p-3" value={notes} onChange={e=>setNotes(e.target.value)} />
            <button onClick={submit} className="w-full rounded-xl px-4 py-3 text-xl font-extrabold" style={{background:BLUE}}>CONFIRM BOOKING</button>
            {!!message && <p className="text-sm text-blue-300">{message}</p>}
          </div>
        </section>
      </div>
    </div>
  </main>;
}
