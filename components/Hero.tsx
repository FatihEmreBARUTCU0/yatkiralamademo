import Image from "next/image";
import AramaCubugu from "./AramaCubugu";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1674606867042-2aa3581c1bb5?auto=format&fit=crop&w=1920&q=85";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Lüks yat denizde"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 text-center lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-gold">
          Ege & Akdeniz&apos;de Ayrıcalıklı Deneyim
        </p>
        <h1 className="font-serif text-4xl font-light leading-tight tracking-wide text-white sm:text-6xl lg:text-7xl">
          Premium Yat Kiralama
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          Lokasyon, tarih ve misafir sayısına göre en uygun tekneyi bulun.
          Saatlik, günübirlik veya konaklamalı kiralama seçenekleri.
        </p>

        <div className="mx-auto mt-10">
          <AramaCubugu />
        </div>
      </div>
    </section>
  );
}
