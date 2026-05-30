import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-extrabold text-gradient-gold mb-2">404</div>
        <h1 className="text-2xl font-bold text-[var(--color-primary-800)] mb-2">
          الصفحة غير موجودة
        </h1>
        <p className="text-[var(--color-ink-muted)] mb-6">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-[var(--color-primary-800)] text-white font-medium hover:bg-[var(--color-primary-700)]"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
