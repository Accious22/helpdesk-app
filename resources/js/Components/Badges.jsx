const PRIORITY_STYLES = {
    Low: 'bg-slate-100 text-slate-700 ring-slate-200',
    Medium: 'bg-blue-50 text-blue-700 ring-blue-200',
    High: 'bg-amber-50 text-amber-800 ring-amber-200',
    Urgent: 'bg-red-50 text-red-700 ring-red-200',
};

const STATUS_STYLES = {
    Open: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    'In Progress': 'bg-sky-50 text-sky-700 ring-sky-200',
    Resolved: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    Closed: 'bg-gray-100 text-gray-600 ring-gray-200',
};

const base =
    'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset';

export function PriorityBadge({ value }) {
    return <span className={`${base} ${PRIORITY_STYLES[value] ?? PRIORITY_STYLES.Low}`}>{value}</span>;
}

export function StatusBadge({ value }) {
    return <span className={`${base} ${STATUS_STYLES[value] ?? STATUS_STYLES.Closed}`}>{value}</span>;
}
