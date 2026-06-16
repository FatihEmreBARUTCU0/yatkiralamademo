import teknelerData from "@/data/tekneler.json";
import type { KiralamaTipi, Siralama, Tekne, TekneTipi } from "@/types/tekne";

export const tekneler = teknelerData as Tekne[];

export const tekneTipleri: TekneTipi[] = [
  "Motoryat",
  "Gulet",
  "Katamaran",
  "Davet Gemisi",
  "Yelkenli",
];

export const lokasyonlar = [
  "Tümü",
  "İstanbul",
  "Bebek",
  "Karaköy",
  "Arnavutköy",
  "Eminönü",
  "Bodrum",
  "Göcek",
  "Fethiye",
  "Çeşme",
  "Marmaris",
];

export function getTekneByKod(kod: string): Tekne | undefined {
  return tekneler.find((t) => t.kod === kod || t.slug === kod);
}

export function formatFiyat(fiyat: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(fiyat);
}

export function getFiyat(tekne: Tekne, tip: KiralamaTipi): number {
  if (tip === "saatlik") return tekne.fiyat.saatlik;
  if (tip === "gunluk") return tekne.fiyat.gunluk;
  return tekne.fiyat.konaklamali ?? tekne.fiyat.gunluk;
}

export function getFiyatBirimi(tip: KiralamaTipi): string {
  if (tip === "saatlik") return "/saat";
  if (tip === "gunluk") return "/günübirlik";
  return "/gece";
}

export interface FiltreParams {
  tip?: TekneTipi | "";
  lokasyon?: string;
  kapasite?: number;
  minFiyat?: number;
  maxFiyat?: number;
  kiralamaTipi?: KiralamaTipi;
  siralama?: Siralama;
  q?: string;
}

export function filtreleTekneler(params: FiltreParams): Tekne[] {
  const {
    tip = "",
    lokasyon = "",
    kapasite = 1,
    minFiyat = 0,
    maxFiyat = Infinity,
    kiralamaTipi = "saatlik",
    siralama = "onerilen",
    q = "",
  } = params;

  let sonuc = tekneler.filter((tekne) => {
    if (tip && tekne.tip !== tip) return false;
    if (
      lokasyon &&
      lokasyon !== "Tümü" &&
      !tekne.lokasyon.toLowerCase().includes(lokasyon.toLowerCase())
    )
      return false;
    if (tekne.ozellikler.seyirKapasitesi < kapasite) return false;

    const fiyat = getFiyat(tekne, kiralamaTipi);
    if (fiyat < minFiyat || fiyat > maxFiyat) return false;

    if (q) {
      const arama = q.toLowerCase();
      const eslesme =
        tekne.ad.toLowerCase().includes(arama) ||
        tekne.kod.toLowerCase().includes(arama) ||
        tekne.lokasyon.toLowerCase().includes(arama) ||
        tekne.tip.toLowerCase().includes(arama);
      if (!eslesme) return false;
    }

    return true;
  });

  sonuc = [...sonuc].sort((a, b) => {
    switch (siralama) {
      case "fiyat-artan":
        return getFiyat(a, kiralamaTipi) - getFiyat(b, kiralamaTipi);
      case "fiyat-azalan":
        return getFiyat(b, kiralamaTipi) - getFiyat(a, kiralamaTipi);
      case "populer":
        return b.degerlendirmeSayisi - a.degerlendirmeSayisi;
      case "puan":
        return b.puan - a.puan;
      default:
        return 0;
    }
  });

  return sonuc;
}
