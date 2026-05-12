import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/cancel')({ component: CancelPage });

function CancelPage() {
  const [message, setMessage] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get('id');
    if (!id) {
      setMessage('Missing booking id.');
      setLoading(false);
      return;
    }
    setBookingId(id);
    fetch(`/api/booking/cancel?id=${id}`).then(async r => {
      const d = await r.json();
      setMessage(d.error ? `Unable to load booking: ${d.error}` : 'Confirm cancellation below.');
      setLoading(false);
    });
  }, []);

  async function confirmCancel() {
    if (!bookingId) return;
    setSubmitting(true);
    const res = await fetch(`/api/booking/cancel?id=${bookingId}`, { method: 'POST' });
    const d = await res.json();
    setMessage(d.message || d.error || 'Done');
    setSubmitting(false);
  }

  return <main className="min-h-screen grid place-items-center bg-[#030814] text-white p-6">
    <div className="max-w-md text-center space-y-4">
      <p className="text-xl font-bold">{loading ? 'Loading booking...' : message}</p>
      {!loading && message === 'Confirm cancellation below.' && (
        <button onClick={confirmCancel} disabled={submitting} className="rounded-lg bg-red-600 px-4 py-2 font-semibold disabled:opacity-60">
          {submitting ? 'Cancelling...' : 'Yes, cancel this booking'}
        </button>
      )}
    </div>
  </main>;
}
