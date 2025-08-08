'use client';
import { useState, useTransition } from 'react';

export function UnsubscribeButton({ email }: { email: string }) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const onClick = () => {
    start(async () => {
      await fetch('/api/newsletter/unsubscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setDone(true);
      location.reload();
    });
  };
  return (
    <button disabled={pending||done} onClick={onClick} className="text-xs px-2 py-1 rounded border border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50">
      {done ? 'Done' : pending ? '...' : 'Unsubscribe'}
    </button>
  );
}
