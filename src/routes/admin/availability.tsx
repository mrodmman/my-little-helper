import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin/availability')({ component: AdminAvailability });

function AdminAvailability() {
  const [password, setPassword] = useState('');
  const [days, setDays] = useState<number[]>([1,2,3,4,5]);
  const [blackouts, setBlackouts] = useState('');
  const [message, setMessage] = useState('');

  async function save() {
    const res = await fetch('/api/booking/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-password': password }, body: JSON.stringify({ workingDays: days, blackoutDates: blackouts.split(',').map(s=>s.trim()).filter(Boolean) }) });
    const data = await res.json();
    setMessage(data.ok ? 'Saved' : data.error);
  }

  return <main className="p-6 max-w-xl mx-auto text-white bg-[#030814] min-h-screen">
    <h1 className="text-3xl font-black">Availability Control Panel</h1>
    <input type="password" placeholder="Admin Password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-4 w-full rounded-lg bg-[#07101f] p-3" />
    <div className="mt-4 flex gap-2 flex-wrap">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=><button key={d} onClick={()=>setDays(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i])} className="rounded-full px-4 py-2 border" style={{background:days.includes(i)?'#1763ff':'transparent'}}>{d}</button>)}</div>
    <textarea value={blackouts} onChange={e=>setBlackouts(e.target.value)} className="mt-4 w-full rounded-lg bg-[#07101f] p-3" placeholder="Blackout dates CSV (YYYY-MM-DD)" />
    <button onClick={save} className="mt-4 rounded-lg bg-[#1763ff] px-5 py-3 font-bold">Save Settings</button>
    {!!message && <p className="mt-3">{message}</p>}
  </main>;
}
