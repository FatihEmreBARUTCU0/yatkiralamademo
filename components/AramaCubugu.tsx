"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { KiralamaTipi } from "@/types/tekne";
import { lokasyonlar } from "@/lib/tekneler";

interface AramaCubuguProps {
  varsayilanKiralama?: KiralamaTipi;
  kompakt?: boolean;
}

export default function AramaCubugu({
  varsayilanKiralama = "saatlik",
  kompakt = false,
}: AramaCubuguProps) {
  const router = useRouter();
  const [kiralama, setKiralama] = useState<KiralamaTipi>(varsayilanKiralama);
  const [lokasyon, setLokasyon] = useState("");
  const [misafir, setMisafir] = useState(1);

  function ara() {
    const params = new URLSearchParams();
    params.set("kiralama", kiralama);
    if (lokasyon && lokasyon !== "Tümü") params.set("lokasyon", lokasyon);
    if (misafir > 1) params.set("kapasite", String(misafir));
    router.push(`/tekne-kiralama?${params.toString()}`);
  }

  return (
    <div className={kompakt ? "" : "w-full max-w-5xl"}>
      {!kompakt && (
        <div className="mb-4 flex flex-wrap gap-2">
          {(
            [
              ["saatlik", "Saatlik"],
              ["gunluk", "Günübirlik"],
              ["konaklamali", "Konaklamalı"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setKiralama(val)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                kiralama === val
                  ? "bg-gold text-navy"
                  : "border border-white/20 text-white/70 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div
        className={`flex flex-col gap-3 bg-white/5 backdrop-blur-md ${
          kompakt
            ? "border border-white/10 p-3 lg:flex-row lg:items-end"
            : "border border-white/15 p-4 shadow-2xl lg:flex-row lg:items-end lg:gap-0 lg:p-2"
        }`}
      >
        <div className={`flex-1 ${kompakt ? "" : "lg:border-r lg:border-white/10 lg:px-4 lg:py-3"}`}>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-gold">
            Lokasyon
          </label>
          <select
            value={lokasyon}
            onChange={(e) => setLokasyon(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none"
          >
            {lokasyonlar.map((l) => (
              <option key={l} value={l === "Tümü" ? "" : l} className="bg-navy text-white">
                {l === "Tümü" ? "Nereden binmek istiyorsun?" : l}
              </option>
            ))}
          </select>
        </div>

        <div className={`flex-1 ${kompakt ? "" : "lg:border-r lg:border-white/10 lg:px-4 lg:py-3"}`}>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-gold">
            Tarih
          </label>
          <input
            type="date"
            className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
        </div>

        <div className={`flex-1 ${kompakt ? "" : "lg:px-4 lg:py-3"}`}>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-gold">
            Misafir Sayısı
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMisafir(Math.max(1, misafir - 1))}
              className="flex h-7 w-7 items-center justify-center border border-white/20 text-white/70 hover:border-gold hover:text-gold"
            >
              −
            </button>
            <span className="text-sm text-white">{misafir} Misafir</span>
            <button
              type="button"
              onClick={() => setMisafir(misafir + 1)}
              className="flex h-7 w-7 items-center justify-center border border-white/20 text-white/70 hover:border-gold hover:text-gold"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={ara}
          className={`shrink-0 bg-gold font-semibold uppercase tracking-wider text-navy transition-all hover:bg-gold/90 ${
            kompakt ? "px-6 py-3 text-xs" : "w-full px-8 py-4 text-sm lg:w-auto"
          }`}
        >
          Tekne Ara
        </button>
      </div>
    </div>
  );
}
