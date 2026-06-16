import Link from "next/link";

const lokasyonlar = [
  {
    ad: "İstanbul",
    aciklama: "Boğaz turu ve özel etkinlikler",
    gorsel:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
    slug: "İstanbul",
  },
  {
    ad: "Bodrum",
    aciklama: "Ege'nin incisi, lüks yatlar",
    gorsel:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
    slug: "Bodrum",
  },
  {
    ad: "Göcek",
    aciklama: "Sakin koylar, mavi tur",
    gorsel:
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&q=80",
    slug: "Göcek",
  },
  {
    ad: "Fethiye",
    aciklama: "Ölüdeniz ve çevre koylar",
    gorsel:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
    slug: "Fethiye",
  },
];

export default function PopulerLokasyonlar() {
  return (
    <section className="border-t border-white/10 bg-navy-light py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-gold">
            Destinasyonlar
          </p>
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Popüler Tekne Kiralama Lokasyonları
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lokasyonlar.map((lok) => (
            <Link
              key={lok.slug}
              href={`/tekne-kiralama?lokasyon=${encodeURIComponent(lok.slug)}`}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${lok.gorsel})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors">
                  {lok.ad}
                </h3>
                <p className="mt-1 text-sm text-white/60">{lok.aciklama}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
