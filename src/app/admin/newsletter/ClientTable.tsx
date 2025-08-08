'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { UnsubscribeButton } from './UnsubscribeButton';
import { ReSubscribeButton } from './ReSubscribeButton';

interface Subscriber {
  email: string;
  sources: string | null;
  consentAt: string; // use ISO string for hydration consistency
  unsubscribedAt: string | null; // ISO or null
}

export function ClientTable({ initialSubs, exportToken }: { initialSubs: Subscriber[]; exportToken: string }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all'|'active'|'unsub'>('all');
  const [source, setSource] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filtered = useMemo(() => {
    return initialSubs.filter(s => {
      if (query && !s.email.toLowerCase().includes(query.toLowerCase())) return false;
      if (status === 'active' && s.unsubscribedAt) return false;
      if (status === 'unsub' && !s.unsubscribedAt) return false;
      if (source) {
        const parts = (s.sources||'').split(',').filter(Boolean);
        if (!parts.includes(source)) return false;
      }
      if (from) {
        const d = new Date(from); d.setHours(0,0,0,0);
        if (new Date(s.consentAt) < d) return false;
      }
      if (to) {
        const d = new Date(to); d.setHours(23,59,59,999);
        if (new Date(s.consentAt) > d) return false;
      }
      return true;
    });
  }, [initialSubs, query, status, source, from, to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage-1)*pageSize, currentPage*pageSize);

  const uniqueSources = useMemo(() => {
    const set = new Set<string>();
    initialSubs.forEach(s => (s.sources||'').split(',').filter(Boolean).forEach(x => set.add(x)));
    return Array.from(set).sort();
  }, [initialSubs]);

  const exportUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('token', exportToken);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    if (status === 'active') params.set('active','1');
    return `/api/newsletter/export?${params.toString()}`;
  }, [from, to, status, exportToken]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-medium text-neutral-500 dark:text-neutral-400">Search</label>
          <input value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}} placeholder="Email" className="px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800" />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-medium text-neutral-500 dark:text-neutral-400">Status</label>
          <select value={status} onChange={e=>{setStatus(e.target.value as 'all'|'active'|'unsub');setPage(1);}} className="px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="unsub">Unsubscribed</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-medium text-neutral-500 dark:text-neutral-400">Source</label>
          <select value={source} onChange={e=>{setSource(e.target.value);setPage(1);}} className="px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 min-w-[90px]">
            <option value="">All</option>
            {uniqueSources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-medium text-neutral-500 dark:text-neutral-400">From</label>
          <input type="date" value={from} onChange={e=>{setFrom(e.target.value);setPage(1);}} className="px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800" />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-medium text-neutral-500 dark:text-neutral-400">To</label>
            <input type="date" value={to} onChange={e=>{setTo(e.target.value);setPage(1);}} className="px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-medium text-neutral-500 dark:text-neutral-400">Export</label>
          <div className="flex flex-wrap gap-2">
            <Link href={exportUrl} className={btnCls}>JSON</Link>
            <Link href={exportUrl+"&format=csv"} className={btnCls}>CSV</Link>
            <Link href={exportUrl+"&format=csv&active=1"} className={btnCls}>Active CSV</Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{filtered.length} filtered</span>
          <span>•</span>
          <span>Page {currentPage}/{totalPages}</span>
        </div>
      </div>
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-200 text-xs uppercase tracking-wide sticky top-0 z-10">
              <tr>
                <Th>Email</Th>
                <Th>Sources</Th>
                <Th>Consent</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {pageItems.map(s => {
                const sources = (s.sources || '').split(',').filter(Boolean);
                const isUnsub = Boolean(s.unsubscribedAt);
                return (
                  <tr key={s.email} className="hover:bg-neutral-50 dark:hover:bg-neutral-750/40 transition-colors">
                    <Td><span className="font-medium text-neutral-800 dark:text-neutral-100 break-all">{s.email}</span></Td>
                    <Td>
                      <div className="flex flex-wrap gap-1">
                        {sources.length === 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-200">—</span>
                        )}
                        {sources.map(src => (
                          <span key={src} className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-200">{src}</span>
                        ))}
                      </div>
                    </Td>
                    <Td><span className="text-neutral-600 dark:text-neutral-300 whitespace-nowrap">{new Date(s.consentAt as string).toLocaleString()}</span></Td>
                    <Td>
                      {isUnsub ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-600/30 text-red-700 dark:text-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Unsubscribed</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-600/30 text-emerald-700 dark:text-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active</span>
                      )}
                    </Td>
                    <Td className="text-right">
                      {!isUnsub ? <UnsubscribeButton email={s.email} /> : <ReSubscribeButton email={s.email} />}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

const btnCls = 'inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 transition';

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number)=>void }) {
  if (totalPages <= 1) return null;
  const go = (p: number) => onPageChange(Math.max(1, Math.min(totalPages, p)));
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/50">
      <div>Showing page {page} of {totalPages}</div>
      <div className="flex gap-1">
        <button onClick={()=>go(1)} disabled={page===1} className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 disabled:opacity-40">« First</button>
        <button onClick={()=>go(page-1)} disabled={page===1} className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 disabled:opacity-40">‹ Prev</button>
        <button onClick={()=>go(page+1)} disabled={page===totalPages} className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 disabled:opacity-40">Next ›</button>
        <button onClick={()=>go(totalPages)} disabled={page===totalPages} className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 disabled:opacity-40">Last »</button>
      </div>
    </div>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <th className={"p-2 font-semibold text-left border-b border-neutral-200 dark:border-neutral-600 "+className}>{children}</th>; }
function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <td className={"p-2 align-middle text-neutral-700 dark:text-neutral-200 "+className}>{children}</td>; }
