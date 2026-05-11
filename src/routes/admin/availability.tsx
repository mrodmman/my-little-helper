import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

type Settings = { availabilityMode?: 'rules' | 'allowlist'; workingDays: number[]; blackoutDates: string[]; dailyTimeBlocks: { weekday: number; time: string }[]; dateTimeBlocks: { date: string; time: string }[]; allowedDateTimes?: { date: string; time: string }[] };

export const Route = createFileRoute('/admin/availability')({ component: AdminAvailability });

function AdminAvailability() {
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState<Settings>({ availabilityMode: 'allowlist', workingDays: [1,2,3,4,5], blackoutDates: [], dailyTimeBlocks: [], dateTimeBlocks: [], allowedDateTimes: [] });
  const [history, setHistory] = useState<Settings[]>([]);
  const [future, setFuture] = useState<Settings[]>([]);
  const [pickedDate, setPickedDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('09:00');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!password) return;
    void fetch('/api/booking/admin/settings', { headers: { 'x-admin-password': password } }).then(async (r) => {
      const d = await r.json();
      if (d.settings) setSettings(d.settings);
    });
  }, [password]);

  async function save() {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/booking/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-password': password }, body: JSON.stringify(settings) });
      const data = await res.json();
      setMessage(data.ok ? 'Availability settings saved successfully.' : `Error saving settings: ${data.error || 'Unknown error'}`);
    } catch {
      setMessage('Error saving settings: Network request failed.');
    } finally {
      setSaving(false);
    }
  }

  const updateSettings = (updater: (curr: Settings) => Settings) => {
    setSettings((curr) => {
      const next = updater(curr);
      setHistory((h) => [...h, curr]);
      setFuture([]);
      return next;
    });
  };
  const undo = () => setHistory((h) => {
    if (!h.length) return h;
    setFuture((f) => [settings, ...f]);
    setSettings(h[h.length - 1]);
    return h.slice(0, -1);
  });
  const redo = () => setFuture((f) => {
    if (!f.length) return f;
    setHistory((h) => [...h, settings]);
    setSettings(f[0]);
    return f.slice(1);
  });

  return <div className="space-y-6 max-w-5xl">
    <div><h1 className="text-2xl font-bold">Calendar & Availability</h1><p className="text-sm text-muted-foreground">Default mode is fully blocked. Add only the slots you want available, and use undo/redo anytime.</p></div>
    <input type="password" placeholder="Admin Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full max-w-sm rounded-xl border border-border bg-surface/60 px-3 py-2" />
    <div className="flex gap-2">
      <button className="rounded-lg border border-border px-3 py-2 text-sm" onClick={undo} disabled={!history.length || saving}>Undo</button>
      <button className="rounded-lg border border-border px-3 py-2 text-sm" onClick={redo} disabled={!future.length || saving}>Redo</button>
    </div>
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-4 space-y-4">
        <h2 className="font-semibold">Availability mode</h2>
        <div className="flex gap-2">
          <button className="rounded-full px-4 py-2 border border-border" style={{background:settings.availabilityMode==='allowlist'?'#1a5cff':'transparent'}} onClick={()=>updateSettings(s=>({...s,availabilityMode:'allowlist'}))}>All blocked (pick available only)</button>
          <button className="rounded-full px-4 py-2 border border-border" style={{background:settings.availabilityMode==='rules'?'#1a5cff':'transparent'}} onClick={()=>updateSettings(s=>({...s,availabilityMode:'rules'}))}>Rule-based (working days/blocks)</button>
        </div>
        {settings.availabilityMode === 'allowlist' ? <>
          <h2 className="font-semibold">Add available date + time</h2>
          <Calendar mode="single" selected={pickedDate} onSelect={setPickedDate} />
          <div className="flex gap-2 items-center"><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="rounded border border-border bg-transparent px-2 py-2" /><button className="rounded bg-primary px-3 py-2 text-sm" onClick={()=>{if(!pickedDate)return;const d=pickedDate.toISOString().slice(0,10);updateSettings(s=>({...s,allowedDateTimes:[...(s.allowedDateTimes??[]),{date:d,time}]}));}}>Add available slot</button></div>
          <div className="space-y-1 text-xs text-muted-foreground">{(settings.allowedDateTimes??[]).map((b,idx)=><div key={`${b.date}-${b.time}-${idx}`} className="flex items-center justify-between"><span>{b.date} {b.time}</span><button onClick={()=>updateSettings(s=>({...s,allowedDateTimes:(s.allowedDateTimes??[]).filter((_,i)=>i!==idx)}))}>Remove</button></div>)}</div>
        </> : <>
        <h2 className="font-semibold">Working days</h2>
        <div className="flex gap-2 flex-wrap">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=><button key={d} onClick={()=>updateSettings(s=>({...s,workingDays:s.workingDays.includes(i)?s.workingDays.filter(x=>x!==i):[...s.workingDays,i]}))} className="rounded-full px-4 py-2 border border-border" style={{background:settings.workingDays.includes(i)?'#1a5cff':'transparent'}}>{d}</button>)}</div>
        <h2 className="font-semibold">Blackout dates</h2>
        <Calendar mode="single" selected={pickedDate} onSelect={setPickedDate} />
        <button className="rounded-lg bg-primary px-3 py-2 text-sm" onClick={()=>{if(!pickedDate)return;const d=pickedDate.toISOString().slice(0,10);updateSettings(s=>({...s,blackoutDates:s.blackoutDates.includes(d)?s.blackoutDates:s.blackoutDates.concat(d)}));}}>Add blackout date</button>
        <div className="space-y-1 text-xs text-muted-foreground">{settings.blackoutDates.map((d)=><div key={d} className="flex items-center justify-between"><span>{d}</span><button onClick={()=>updateSettings(s=>({...s,blackoutDates:s.blackoutDates.filter(x=>x!==d)}))}>Unblock</button></div>)}</div>
        </>}
      </div>
      <div className="glass-card rounded-2xl p-4 space-y-4">
        {settings.availabilityMode === 'rules' && <>
        <h2 className="font-semibold">Block recurring time-of-day by weekday</h2>
        <div className="flex gap-2 items-center"><select className="rounded border border-border bg-transparent px-2 py-2" id="weekday">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=><option key={d} value={i}>{d}</option>)}</select><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="rounded border border-border bg-transparent px-2 py-2" /><button className="rounded bg-primary px-3 py-2 text-sm" onClick={()=>{const weekday=Number((document.getElementById('weekday') as HTMLSelectElement).value);updateSettings(s=>({...s,dailyTimeBlocks:s.dailyTimeBlocks.concat({weekday,time})}));}}>Add block</button></div>
        <div className="space-y-1 text-xs text-muted-foreground">{settings.dailyTimeBlocks.map((b,idx)=><div key={`${b.weekday}-${b.time}-${idx}`} className="flex items-center justify-between"><span>{b.weekday}@{b.time}</span><button onClick={()=>updateSettings(s=>({...s,dailyTimeBlocks:s.dailyTimeBlocks.filter((_,i)=>i!==idx)}))}>Unblock</button></div>)}</div>
        <h2 className="font-semibold">Block specific date + time</h2>
        <div className="flex gap-2 items-center"><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="rounded border border-border bg-transparent px-2 py-2" /><button className="rounded bg-primary px-3 py-2 text-sm" onClick={()=>{if(!pickedDate)return;const d=pickedDate.toISOString().slice(0,10);updateSettings(s=>({...s,dateTimeBlocks:s.dateTimeBlocks.concat({date:d,time})}));}}>Add date-time block</button></div>
        <div className="space-y-1 text-xs text-muted-foreground">{settings.dateTimeBlocks.map((b,idx)=><div key={`${b.date}-${b.time}-${idx}`} className="flex items-center justify-between"><span>{b.date} {b.time}</span><button onClick={()=>updateSettings(s=>({...s,dateTimeBlocks:s.dateTimeBlocks.filter((_,i)=>i!==idx)}))}>Unblock</button></div>)}</div>
        </>}
      </div>
    </div>
    <button onClick={save} disabled={saving} className="rounded-xl bg-primary px-5 py-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed">{saving ? 'Saving...' : 'Save Availability Rules'}</button>
    {message && <p className={`text-sm ${message.startsWith('Error') ? 'text-red-400' : 'text-primary'}`}>{message}</p>}
  </div>;
}
