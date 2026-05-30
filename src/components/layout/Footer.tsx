import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-[var(--color-primary-900)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-gradient-gold font-extrabold text-xl mb-3">بيت المسلمين</h3>
          <p className="text-sm leading-7 text-white/70">
            منصة إسلامية شاملة لقراءة القرآن الكريم والاستماع لتلاوات نخبة من القراء،
            وتصفح الأحاديث النبوية ومعرفة مواقيت الصلاة في مدينتك.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">أقسام الموقع</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mushaf" className="hover:text-[var(--color-accent-300)]">المصحف الشريف</Link></li>
            <li><Link href="/quraa" className="hover:text-[var(--color-accent-300)]">القراء</Link></li>
            <li><Link href="/hadith" className="hover:text-[var(--color-accent-300)]">الأحاديث النبوية</Link></li>
            <li><Link href="/prayer-times" className="hover:text-[var(--color-accent-300)]">مواقيت الصلاة</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">من نحن</h4>
          <p className="text-sm leading-7 text-white/70">
            نقدّم محتوى إسلامي مجاني نقي للقارئ والمستمع، نسأل الله القبول وأن ينتفع بها كل مسلم.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 text-center text-xs text-white/60">
          © {year} بيت المسلمين — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
