import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const stats = [
    { key: 'total', label: 'All tickets' },
    { key: 'open', label: 'Open' },
    { key: 'progress', label: 'In progress' },
    { key: 'resolved', label: 'Resolved' },
];

export default function Dashboard({ counts }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">{s.label}</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{counts[s.key]}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <Link href={route('tickets.index')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    View all tickets
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
