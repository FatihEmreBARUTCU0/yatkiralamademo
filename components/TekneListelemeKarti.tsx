"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatFiyat,
  getFiyat,
  getFiyatBirimi,
} from "@/lib/tekneler";
import type { KiralamaTipi, Tekne } from "@/types/tekne";

function Yildiz({ puan }: { puan: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-gold">
      <svg className="h-3.5 w-3.5 fill-gold" viewBox="0 0 20 20">
        <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
      </svg>
      {puan.toFixed(2)}
    </span>
  );
}

export default function TekneListelemeKarti({
  tekne,
  kiralamaTipi = "saatlik",
}: {
  tekne: Tekne;
  kiralamaTipi?: KiralamaTipi;
}) {
  const fiyat = getFiyat(tekne, kiralamaTipi);

  return (
    <Link
      href={`/tekne-kiralama/${tekne.slug}`}
      className="group block overflow-hidden border border-white/10 bg-navy-light transition-all hover:border-gold/40 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={tekne.gorsel}
          alt={tekne.ad}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {tekne.anindaRezerve && (
            <span className="bg-gold px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
              ⚡ Anında Rezerve
            </span>
          )}
          {tekne.rozet && (
            <span className="border border-white/30 bg-navy/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {tekne.rozet}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy/60 text-white/70 backdrop-blur-sm transition-colors hover:text-gold"
          aria-label="Favorilere ekle"
        >
          ♡
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
              {tekne.kod}
            </p>
            <h3 className="mt-1 font-serif text-lg leading-snug text-white group-hover:text-gold transition-colors">
              {tekne.ad}
            </h3>
          </div>
          <Yildiz puan={tekne.puan} />
        </div>

        <p className="mt-1 text-xs text-white/40">
          {tekne.degerlendirmeSayisi} değerlendirme
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
            {tekne.tip}
          </span>
          {tekne.ozellikler.kaptanli && (
            <span className="border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
              Kaptanlı
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
          <div className="text-xs text-white/50">
            <p>📍 {tekne.lokasyon}</p>
            <p className="mt-1">
              Kapasite: {tekne.ozellikler.seyirKapasitesi} kişi ·{" "}
              {tekne.ozellikler.uzunluk}
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-xl text-gold">
              {formatFiyat(fiyat)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {getFiyatBirimi(kiralamaTipi)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
