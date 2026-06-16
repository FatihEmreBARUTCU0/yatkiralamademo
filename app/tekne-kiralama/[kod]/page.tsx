import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatFiyat,
  getTekneByKod,
  tekneler,
} from "@/lib/tekneler";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ kod: string }>;
}

export function generateStaticParams() {
  return tekneler.map((t) => ({ kod: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kod } = await params;
  const tekne = getTekneByKod(kod);
  if (!tekne) return { title: "Tekne Bulunamadı" };
  return {
    title: `${tekne.ad} | ${tekne.kod} | Premium Yat Kiralama`,
    description: tekne.aciklama,
  };
}

export default async function TekneDetayPage({ params }: Props) {
  const { kod } = await params;
  const tekne = getTekneByKod(kod);
  if (!tekne) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <nav className="mb-6 text-sm text-white/40">
        <Link href="/" className="hover:text-gold">
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link href="/tekne-kiralama" className="hover:text-gold">
          Tekne Kiralama
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">{tekne.ad}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={tekne.gorsel}
              alt={tekne.ad}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            {tekne.anindaRezerve && (
              <span className="absolute left-4 top-4 bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy">
                ⚡ Anında Rezerve
              </span>
            )}
          </div>

          {tekne.gorseller.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {tekne.gorseller.slice(0, 4).map((g, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g}
                    alt={`${tekne.ad} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                {tekne.kod}
              </span>
              <span className="border border-white/10 px-2 py-0.5 text-xs text-white/60">
                {tekne.tip}
              </span>
              {tekne.rozet && (
                <span className="border border-gold/40 px-2 py-0.5 text-xs text-gold">
                  {tekne.rozet}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
              {tekne.ad}
            </h1>

            <div className="mt-3 flex items-center gap-4 text-sm text-white/60">
              <span className="text-gold">★ {tekne.puan.toFixed(2)}</span>
              <span>{tekne.degerlendirmeSayisi} değerlendirme</span>
              <span>📍 {tekne.lokasyon}</span>
            </div>

            <p className="mt-6 leading-relaxed text-white/70">{tekne.aciklama}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Uzunluk", tekne.ozellikler.uzunluk],
                ["Kapasite", `${tekne.ozellikler.seyirKapasitesi} kişi`],
                ["Mürettebat", `${tekne.ozellikler.murettebat} kişi`],
                [
                  "Kaptan",
                  tekne.ozellikler.kaptanli ? "Dahil" : "Hariç",
                ],
                ...(tekne.ozellikler.kabin
                  ? [["Kabin", `${tekne.ozellikler.kabin} adet`] as const]
                  : []),
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border border-white/10 bg-navy-light p-4 text-center"
                >
                  <p className="text-[10px] uppercase tracking-widest text-white/40">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-serif text-xl text-white">Donanım</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {tekne.donanim.map((d) => (
                  <span
                    key={d}
                    className="border border-white/10 px-3 py-1.5 text-xs text-white/60"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-white/10 bg-navy-light p-6">
            <h2 className="font-serif text-xl text-white">Fiyatlar</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/60">Saatlik</span>
                <span className="font-serif text-lg text-gold">
                  {formatFiyat(tekne.fiyat.saatlik)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/60">Günübirlik</span>
                <span className="font-serif text-lg text-gold">
                  {formatFiyat(tekne.fiyat.gunluk)}
                </span>
              </div>
              {tekne.fiyat.konaklamali && (
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm text-white/60">Konaklamalı</span>
                  <span className="font-serif text-lg text-gold">
                    {formatFiyat(tekne.fiyat.konaklamali)}
                  </span>
                </div>
              )}
            </div>

            <a
              href={`https://wa.me/905551234567?text=${encodeURIComponent(
                `Merhaba, ${tekne.kod} (${tekne.ad}) için rezervasyon yapmak istiyorum.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full bg-gold py-4 text-center text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:bg-gold/90"
            >
              Rezervasyon Yap
            </a>

            <p className="mt-4 text-center text-xs text-white/40">
              7/24 WhatsApp destek · Anında yanıt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
