import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

const selectClass =
    'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30';

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export default function Index({ tickets, filters, options }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const applyFilters = (next) => {
        const merged = { ...filters, search, ...next };
        const params = Object.fromEntries(Object.entries(merged).filter(([, v]) => v));
        router.get(route('tickets.index'), params, { preserveState: true, replace: true });
    };

    const hasFilters = Object.values(filters).some(Boolean);
    const isEmpty = tickets.data.length === 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-slate-900">My tickets</h1>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 md:hidden"
                    >
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    applyFilters({});
                }}
                className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto]"
            >
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title"
                    aria-label="Search tickets by title"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
                <select aria-label="Filter by status" className={selectClass} value={filters.status ?? ''} onChange={(e) => applyFilters({ status: e.target.value })}>
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select aria-label="Filter by priority" className={selectClass} value={filters.priority ?? ''} onChange={(e) => applyFilters({ priority: e.target.value })}>
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select aria-label="Filter by category" className={selectClass} value={filters.category ?? ''} onChange={(e) => applyFilters({ category: e.target.value })}>
                    <option value="">All categories</option>
                    {options.categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button type="submit" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                    Search
                </button>
            </form>

            {isEmpty ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                    <h2 className="text-base font-semibold text-slate-900">
                        {hasFilters ? 'No tickets match these filters' : 'No tickets yet'}
                    </h2>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                        {hasFilters
                            ? 'Try a different search or clear the filters to see all your tickets.'
                            : 'When something breaks or you need help, file a ticket and track it here.'}
                    </p>
                    <div className="mt-6">
                        {hasFilters ? (
                            <Link href={route('tickets.index')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                Clear filters
                            </Link>
                        ) : (
                            <Link href={route('tickets.create')} className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
                                Create your first ticket
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
                                <tr>
                                    <th className="px-5 py-3">Title</th>
                                    <th className="px-5 py-3">Category</th>
                                    <th className="px-5 py-3">Priority</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Created</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="transition hover:bg-slate-50">
                                        <td className="max-w-xs truncate px-5 py-3.5 font-medium text-slate-900">
                                            <Link href={route('tickets.show', t.id)} className="hover:text-indigo-600">
                                                {t.title}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-600">{t.category}</td>
                                        <td className="px-5 py-3.5"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-5 py-3.5"><StatusBadge value={t.status} /></td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">{formatDate(t.created_at)}</td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-right">
                                            <Link href={route('tickets.show', t.id)} className="font-medium text-indigo-600 hover:text-indigo-500">View</Link>
                                            <Link href={route('tickets.edit', t.id)} className="ml-4 font-medium text-slate-600 hover:text-slate-900">Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <ul className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <li key={t.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <Link href={route('tickets.show', t.id)} className="block font-semibold text-slate-900">
                                    {t.title}
                                </Link>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                </div>
                                <p className="mt-3 text-xs text-slate-500">
                                    {t.category} &middot; {formatDate(t.created_at)}
                                </p>
                                <div className="mt-3 flex gap-4 text-sm font-medium">
                                    <Link href={route('tickets.show', t.id)} className="text-indigo-600">View</Link>
                                    <Link href={route('tickets.edit', t.id)} className="text-slate-600">Edit</Link>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination (no raw HTML labels, so no dangerouslySetInnerHTML) */}
                    <nav className="mt-6 flex items-center justify-between text-sm text-slate-600" aria-label="Pagination">
                        <p>
                            Showing {tickets.from}-{tickets.to} of {tickets.total}
                        </p>
                        <div className="flex items-center gap-2">
                            {tickets.prev_page_url ? (
                                <Link href={tickets.prev_page_url} preserveScroll className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium transition hover:bg-slate-100">
                                    Previous
                                </Link>
                            ) : (
                                <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-400">Previous</span>
                            )}
                            <span className="px-1">Page {tickets.current_page} of {tickets.last_page}</span>
                            {tickets.next_page_url ? (
                                <Link href={tickets.next_page_url} preserveScroll className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium transition hover:bg-slate-100">
                                    Next
                                </Link>
                            ) : (
                                <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-400">Next</span>
                            )}
                        </div>
                    </nav>
                </>
            )}
        </AuthenticatedLayout>
    );
}
