const inputClass =
    'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:bg-slate-50';

function Field({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

function Select({ id, value, onChange, options, error, disabled }) {
    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={inputClass}
        >
            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    );
}

export default function TicketFormFields({ data, setData, errors, options, processing }) {
    return (
        <div className="space-y-5">
            <Field id="title" label="Title" error={errors.title}>
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    disabled={processing}
                    maxLength={255}
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                    placeholder="e.g. Laptop won't connect to office Wi-Fi"
                    className={inputClass}
                />
            </Field>

            <Field id="description" label="Description" error={errors.description}>
                <textarea
                    id="description"
                    rows={6}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    placeholder="What happened, what you expected, and anything you already tried."
                    className={inputClass}
                />
            </Field>

            <div className="grid gap-5 sm:grid-cols-3">
                <Field id="priority" label="Priority" error={errors.priority}>
                    <Select
                        id="priority"
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                        options={options.priorities}
                        error={errors.priority}
                        disabled={processing}
                    />
                </Field>
                <Field id="status" label="Status" error={errors.status}>
                    <Select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        options={options.statuses}
                        error={errors.status}
                        disabled={processing}
                    />
                </Field>
                <Field id="category" label="Category" error={errors.category}>
                    <Select
                        id="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        options={options.categories}
                        error={errors.category}
                        disabled={processing}
                    />
                </Field>
            </div>
        </div>
    );
}
