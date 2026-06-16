const ozellikler = [
  { baslik: "Güvenli Ödeme", aciklama: "Kredi kartına 12 taksit" },
  { baslik: "7/24 Destek", aciklama: "WhatsApp ve telefon" },
  { baslik: "Anında Rezervasyon", aciklama: "Hızlı onay süreci" },
  { baslik: "Kaptanlı Hizmet", aciklama: "Profesyonel mürettebat" },
];

export default function GuvenceBanner() {
  return (
    <section className="border-y border-white/10 bg-navy py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-8">
        {ozellikler.map((o) => (
          <div key={o.baslik} className="text-center">
            <p className="font-serif text-lg text-gold">{o.baslik}</p>
            <p className="mt-1 text-sm text-white/50">{o.aciklama}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
