import Link from "next/link";

const populerLokasyonlar = [
  { ad: "İstanbul Yat Kiralama", slug: "İstanbul" },
  { ad: "Bodrum Yat Kiralama", slug: "Bodrum" },
  { ad: "Göcek Tekne Kiralama", slug: "Göcek" },
  { ad: "Fethiye Yat Kiralama", slug: "Fethiye" },
  { ad: "Çeşme Yat Kiralama", slug: "Çeşme" },
  { ad: "Marmaris Yat Kiralama", slug: "Marmaris" },
];

const organizasyonlar = [
  "Teknede Doğum Günü",
  "Yatta Evlilik Teklifi",
  "Teknede Düğün",
  "Boğaz Turu",
  "Adalar Turu",
  "Kurumsal Etkinlik",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl text-white">Premium Yat Kiralama</p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Türkiye&apos;nin en seçkin yat filosuyla Ege ve Akdeniz&apos;de
              unutulmaz deniz deneyimleri sunuyoruz.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>info@premiumyatkiralama.com</p>
              <p>+90 850 308 15 62</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
              Popüler Lokasyonlar
            </h3>
            <ul className="space-y-2">
              {populerLokasyonlar.map((lok) => (
                <li key={lok.slug}>
                  <Link
                    href={`/tekne-kiralama?lokasyon=${encodeURIComponent(lok.slug)}`}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {lok.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
              Tekne Tipleri
            </h3>
            <ul className="space-y-2">
              {["Motoryat Kiralama", "Gulet Kiralama", "Katamaran Kiralama", "Davet Gemisi Kiralama", "Yelkenli Kiralama"].map(
                (tip) => (
                  <li key={tip}>
                    <Link
                      href="/tekne-kiralama"
                      className="text-sm text-white/60 transition-colors hover:text-gold"
                    >
                      {tip}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
              Organizasyonlar
            </h3>
            <ul className="space-y-2">
              {organizasyonlar.map((org) => (
                <li key={org}>
                  <span className="text-sm text-white/60">{org}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Premium Yat Kiralama. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <span>Kullanım Şartları</span>
            <span>KVKK</span>
            <span>İptal Politikası</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
