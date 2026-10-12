import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    const message = flash?.success || flash?.error;
    const isError = !flash?.success && !!flash?.error;

    // `flash` is a new object on every Inertia response, so repeated
    // identical messages still re-trigger the alert.
    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]);

    if (!message || !visible) return null;

    return (
        <div
            role={isError ? 'alert' : 'status'}
            className={`mb-6 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm shadow-sm transition ${
                isError
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
        >
            <p className="font-medium">{message}</p>
            <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Dismiss message"
                className="rounded p-0.5 text-current opacity-60 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>
        </div>
    );
}
