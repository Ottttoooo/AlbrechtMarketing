"use client";
import { useTransition, useState } from 'react';

export function ReSubscribeButton({ email }: { email: string }) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const onClick = () => {
    start(async () => {
      await fetch('/api/newsletter/resubscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setDone(true);
      location.reload();
    });
  };
  return (
    <button disabled={pending||done} onClick={onClick} className="text-xs px-2 py-1 rounded border border-emerald-500 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50">
      {done ? 'Restored' : pending ? '...' : 'Re-subscribe'}
    </button>
  );
}
