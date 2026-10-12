import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props.auth;
    const [menuOpen, setMenuOpen] = useState(false);

    const navLink = (active) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
            active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`;

    const primaryButton =
        'inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Link href={route('dashboard')} className="text-lg font-bold tracking-tight text-indigo-700">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-1 md:flex">
                            <Link href={route('dashboard')} className={navLink(route().current('dashboard'))}>
                                Dashboard
                            </Link>
                            <Link href={route('tickets.index')} className={navLink(route().current('tickets.index'))}>
                                Tickets
                            </Link>
                        </div>
                    </div>

                    <div className="hidden items-center gap-4 md:flex">
                        <Link href={route('tickets.create')} className={primaryButton}>
                            New Ticket
                        </Link>
                        <span className="text-sm font-medium text-slate-700">{user.name}</span>
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Log out
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle menu"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="space-y-1 border-t border-slate-200 px-4 py-3 md:hidden">
                        <p className="px-3 pb-2 text-sm font-medium text-slate-500">{user.name}</p>
                        <Link href={route('dashboard')} className={`block ${navLink(route().current('dashboard'))}`}>
                            Dashboard
                        </Link>
                        <Link href={route('tickets.index')} className={`block ${navLink(route().current('tickets.index'))}`}>
                            Tickets
                        </Link>
                        <Link href={route('tickets.create')} className={`mt-2 w-full ${primaryButton}`}>
                            New Ticket
                        </Link>
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                        >
                            Log out
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <FlashMessage />
                {children}
            </main>
        </div>
    );
}
