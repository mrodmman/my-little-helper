import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

type Settings = { workingDays: number[]; blackoutDates: string[]; dailyTimeBlocks: { weekday: number; time: string }[]; dateTimeBlocks: { date: string; time: string }[] };

export const Route = createFileRoute('/admin/availability')({ component: AdminAvailability });

function AdminAvailability() {
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState<Settings>({ workingDays: [1,2,3,4,5], blackoutDates: [], dailyTimeBlocks: [], dateTimeBlocks: [] });
  const [pickedDate, setPickedDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('09:00');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!password) return;
    void fetch('/api/booking/admin/settings', { headers: { 'x-admin-password': password } }).then(async (r) => {
      const d = await r.json();
      if (d.settings) setSettings(d.settings);
    });
  }, [password]);

  async function save() {
    const res = await fetch('/api/booking/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-password': password }, body: JSON.stringify(settings) });
    const data = await res.json();
    setMessage(data.ok ? 'Saved' : data.error);
  }

  return <div className="space-y-6 max-w-5xl">
    <div><h1 className="text-2xl font-bold">Calendar & Availability</h1><p className="text-sm text-muted-foreground">Block weekdays, specific dates, and time-of-day slots quickly.</p></div>
    <input type="password" placeholder="Admin Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full max-w-sm rounded-xl border border-border bg-surface/60 px-3 py-2" />
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-4 space-y-4">
        <h2 className="font-semibold">Working days</h2>
        <div className="flex gap-2 flex-wrap">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=><button key={d} onClick={()=>setSettings(s=>({...s,workingDays:s.workingDays.includes(i)?s.workingDays.filter(x=>x!==i):[...s.workingDays,i]}))} className="rounded-full px-4 py-2 border border-border" style={{background:settings.workingDays.includes(i)?'#1a5cff':'transparent'}}>{d}</button>)}</div>
        <h2 className="font-semibold">Blackout dates</h2>
        <Calendar mode="single" selected={pickedDate} onSelect={setPickedDate} />
        <button className="rounded-lg bg-primary px-3 py-2 text-sm" onClick={()=>{if(!pickedDate)return;const d=pickedDate.toISOString().slice(0,10);setSettings(s=>({...s,blackoutDates:s.blackoutDates.includes(d)?s.blackoutDates:s.blackoutDates.concat(d)}));}}>Add blackout date</button>
        <div className="text-xs text-muted-foreground">{settings.blackoutDates.join(', ') || 'No blackout dates yet.'}</div>
      </div>
      <div className="glass-card rounded-2xl p-4 space-y-4">
        <h2 className="font-semibold">Block recurring time-of-day by weekday</h2>
        <div className="flex gap-2 items-center"><select className="rounded border border-border bg-transparent px-2 py-2" id="weekday">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=><option key={d} value={i}>{d}</option>)}</select><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="rounded border border-border bg-transparent px-2 py-2" /><button className="rounded bg-primary px-3 py-2 text-sm" onClick={()=>{const weekday=Number((document.getElementById('weekday') as HTMLSelectElement).value);setSettings(s=>({...s,dailyTimeBlocks:s.dailyTimeBlocks.concat({weekday,time})}));}}>Add block</button></div>
        <div className="text-xs text-muted-foreground">{settings.dailyTimeBlocks.map(b=>`${b.weekday}@${b.time}`).join(', ') || 'No recurring blocks.'}</div>
        <h2 className="font-semibold">Block specific date + time</h2>
        <div className="flex gap-2 items-center"><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="rounded border border-border bg-transparent px-2 py-2" /><button className="rounded bg-primary px-3 py-2 text-sm" onClick={()=>{if(!pickedDate)return;const d=pickedDate.toISOString().slice(0,10);setSettings(s=>({...s,dateTimeBlocks:s.dateTimeBlocks.concat({date:d,time})}));}}>Add date-time block</button></div>
        <div className="text-xs text-muted-foreground">{settings.dateTimeBlocks.map(b=>`${b.date} ${b.time}`).join(', ') || 'No specific time blocks.'}</div>
      </div>
    </div>
    <button onClick={save} className="rounded-xl bg-primary px-5 py-2 font-semibold">Save Availability Rules</button>
    {message && <p className="text-sm text-primary">{message}</p>}
  </div>;
}
