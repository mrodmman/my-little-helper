import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/cancel')({ component: CancelPage });

function CancelPage() {
  const [message, setMessage] = useState('Cancelling booking...');
  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get('id');
    if (!id) return setMessage('Missing booking id.');
    fetch(`/api/booking/cancel?id=${id}`).then(async r => {
      const d = await r.json();
      setMessage(d.message || d.error || 'Done');
    });
  }, []);
  return <main className="min-h-screen grid place-items-center bg-[#030814] text-white"><p className="text-xl font-bold">{message}</p></main>;
}
