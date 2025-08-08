// Handle both sync and (future) async searchParams form to silence Next.js warning.
'use client';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHasError(params.has('error'));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form action="/api/admin/login" method="POST" className="border rounded p-6 w-full max-w-sm space-y-4 bg-white shadow">
        <h1 className="text-lg font-semibold">Admin Login</h1>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input name="user" className="w-full border px-2 py-1 rounded" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input name="pass" type="password" className="w-full border px-2 py-1 rounded" required />
        </div>
        {hasError && <p className="text-sm text-red-600">Invalid credentials</p>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
