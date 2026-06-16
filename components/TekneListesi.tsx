"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TekneListelemeKarti from "./TekneListelemeKarti";
import AramaCubugu from "./AramaCubugu";
import {
  filtreleTekneler,
  formatFiyat,
  lokasyonlar,
  tekneTipleri,
  tekneler,
} from "@/lib/tekneler";
import type { KiralamaTipi, Siralama, TekneTipi } from "@/types/tekne";

const maxFiyat = Math.max(
  ...tekneler.flatMap((t) => [t.fiyat.saatlik, t.fiyat.gunluk])
);

export default function TekneListesi() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const kiralama =
    (searchParams.get("kiralama") as KiralamaTipi) || "saatlik";
  const lokasyon = searchParams.get("lokasyon") || "";
  const tip = (searchParams.get("tip") as TekneTipi) || "";
  const kapasite = Number(searchParams.get("kapasite") || 1);
  const siralama = (searchParams.get("siralama") as Siralama) || "onerilen";
  const minFiyat = Number(searchParams.get("minFiyat") || 0);
  const maxFiyatParam = Number(searchParams.get("maxFiyat") || maxFiyat);

  const [mobilFiltreAcik, setMobilFiltreAcik] = useState(false);
  const [fiyatUst, setFiyatUst] = useState(maxFiyatParam);

  const guncelle = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`/tekne-kiralama?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filtrelenmis = useMemo(
    () =>
      filtreleTekneler({
        tip,
        lokasyon,
        kapasite,
        minFiyat,
        maxFiyat: fiyatUst,
        kiralamaTipi: kiralama,
        siralama,
      }),
    [tip, lokasyon, kapasite, minFiyat, fiyatUst, kiralama, siralama]
  );

  const filtrePaneli = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
          Kiralama Tipi
        </h3>
        <div className="flex flex-col gap-2">
          {(
            [
              ["saatlik", "Saatlik Kiralama"],
              ["gunluk", "Günübirlik Kiralama"],
              ["konaklamali", "Konaklamalı Kiralama"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => guncelle("kiralama", val)}
              className={`px-4 py-2.5 text-left text-sm transition-all ${
                kiralama === val
                  ? "bg-gold/20 text-gold border border-gold/40"
                  : "border border-white/10 text-white/60 hover:border-gold/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
          Tekne Tipi
        </h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => guncelle("tip", "")}
            className={`block w-full px-4 py-2 text-left text-sm ${
              !tip ? "text-gold" : "text-white/60 hover:text-white"
            }`}
          >
            Tümü ({tekneler.length})
          </button>
          {tekneTipleri.map((t) => {
            const sayi = tekneler.filter((tk) => tk.tip === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => guncelle("tip", t)}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  tip === t ? "text-gold" : "text-white/60 hover:text-white"
                }`}
              >
                {t} ({sayi})
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
          Fiyat Aralığı
        </h3>
        <input
          type="range"
          min={0}
          max={maxFiyat}
          step={500}
          value={fiyatUst}
          onChange={(e) => {
            setFiyatUst(Number(e.target.value));
            guncelle("maxFiyat", e.target.value);
          }}
          className="w-full accent-gold"
        />
        <p className="mt-2 text-sm text-white/60">
          En fazla {formatFiyat(fiyatUst)}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
          Lokasyon
        </h3>
        <select
          value={lokasyon}
          onChange={(e) => guncelle("lokasyon", e.target.value)}
          className="w-full border border-white/10 bg-navy-light px-4 py-2.5 text-sm text-white outline-none"
        >
          {lokasyonlar.map((l) => (
            <option key={l} value={l === "Tümü" ? "" : l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
          Kapasite
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              guncelle("kapasite", String(Math.max(1, kapasite - 1)))
            }
            className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/70"
          >
            −
          </button>
          <span className="text-sm text-white">{kapasite}+ kişi</span>
          <button
            type="button"
            onClick={() => guncelle("kapasite", String(kapasite + 1))}
            className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/70"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="border-b border-white/10 bg-navy-light py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AramaCubugu varsayilanKiralama={kiralama} kompakt />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            Tekne Kiralama
          </h1>
          <p className="mt-2 text-white/50">
            {filtrelenmis.length} sonuç bulundu
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 border border-white/10 bg-navy-light p-6">
              <h2 className="mb-6 font-serif text-lg text-white">Filtreler</h2>
              {filtrePaneli}
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setMobilFiltreAcik(!mobilFiltreAcik)}
                className="border border-white/20 px-4 py-2 text-sm text-white/70 lg:hidden"
              >
                Filtreler
              </button>

              <select
                value={siralama}
                onChange={(e) => guncelle("siralama", e.target.value)}
                className="border border-white/10 bg-navy-light px-4 py-2 text-sm text-white outline-none"
              >
                <option value="onerilen">Önerilen sıralama</option>
                <option value="fiyat-artan">En düşük fiyat</option>
                <option value="fiyat-azalan">En yüksek fiyat</option>
                <option value="populer">En popüler</option>
                <option value="puan">En yüksek puan</option>
              </select>
            </div>

            {mobilFiltreAcik && (
              <div className="mb-6 border border-white/10 bg-navy-light p-6 lg:hidden">
                {filtrePaneli}
              </div>
            )}

            {filtrelenmis.length === 0 ? (
              <div className="border border-white/10 bg-navy-light p-12 text-center">
                <p className="font-serif text-xl text-white">
                  Aramanıza uygun tekne bulunamadı
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Filtreleri değiştirerek tekrar deneyin.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtrelenmis.map((tekne) => (
                  <TekneListelemeKarti
                    key={tekne.kod}
                    tekne={tekne}
                    kiralamaTipi={kiralama}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
