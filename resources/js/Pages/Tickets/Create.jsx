import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketFormFields from '@/Components/TicketFormFields';

export default function Create({ options }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: 'Software',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-slate-900">New ticket</h1>}>
            <Head title="New Ticket" />

            <form onSubmit={submit} className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <TicketFormFields data={data} setData={setData} errors={errors} options={options} processing={processing} />

                <div className="mt-8 flex items-center justify-end gap-3">
                    <Link href={route('tickets.index')} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? 'Creating...' : 'Create ticket'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
