import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

const formatDateTime = (iso) =>
    new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export default function Show({ ticket }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        if (!window.confirm('Delete this ticket? This cannot be undone.')) return;
        router.delete(route('tickets.destroy', ticket.id), {
            onStart: () => setDeleting(true),
            onFinish: () => setDeleting(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-slate-900">Ticket #{ticket.id}</h1>
                    <Link href={route('tickets.index')} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Back to tickets
                    </Link>
                </div>
            }
        >
            <Head title={ticket.title} />

            <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                    <PriorityBadge value={ticket.priority} />
                    <StatusBadge value={ticket.status} />
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {ticket.category}
                    </span>
                </div>

                <h2 className="mt-4 break-words text-2xl font-semibold tracking-tight text-slate-900">{ticket.title}</h2>

                {/* React escapes this text; whitespace-pre-wrap keeps the user's line breaks. */}
                <p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-slate-700">{ticket.description}</p>

                <dl className="mt-8 grid gap-4 border-t border-slate-100 pt-6 text-sm sm:grid-cols-2">
                    <div>
                        <dt className="text-slate-500">Created</dt>
                        <dd className="mt-0.5 font-medium text-slate-800">{formatDateTime(ticket.created_at)}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-500">Last updated</dt>
                        <dd className="mt-0.5 font-medium text-slate-800">{formatDateTime(ticket.updated_at)}</dd>
                    </div>
                </dl>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <Link
                        href={route('tickets.edit', ticket.id)}
                        className="inline-flex justify-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                    >
                        Edit ticket
                    </Link>
                </div>
            </article>
        </AuthenticatedLayout>
    );
}
