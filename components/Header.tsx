import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-gold/50 bg-gold/10 text-lg font-serif text-gold">
            PY
          </span>
          <div className="hidden sm:block">
            <p className="font-serif text-lg tracking-wide text-white group-hover:text-gold transition-colors">
              Premium Yat Kiralama
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Lüks Deniz Deneyimi
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/tekne-kiralama"
            className="text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-gold"
          >
            Tekne Kiralama
          </Link>
          <Link
            href="/tekne-kiralama?kiralama=konaklamali"
            className="text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-gold"
          >
            Konaklamalı
          </Link>
          <Link
            href="/tekne-kiralama?kiralama=gunluk"
            className="text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-gold"
          >
            Günübirlik
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+908503081562"
            className="hidden text-sm text-white/60 transition-colors hover:text-gold lg:block"
          >
            +90 850 308 15 62
          </a>
          <Link
            href="/tekne-kiralama"
            className="border border-gold bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-navy"
          >
            Tekne Bul
          </Link>
        </div>
      </div>
    </header>
  );
}
