interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      {icon && <div className="mx-auto text-5xl mb-3 text-[var(--color-primary-400)]">{icon}</div>}
      <h3 className="font-bold text-[var(--color-primary-800)] text-lg mb-1">{title}</h3>
      {message && <p className="text-[var(--color-ink-muted)] text-sm">{message}</p>}
    </div>
  );
}
