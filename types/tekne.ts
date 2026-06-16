export type KiralamaTipi = "saatlik" | "gunluk" | "konaklamali";
export type TekneTipi =
  | "Motoryat"
  | "Gulet"
  | "Katamaran"
  | "Davet Gemisi"
  | "Yelkenli";

export interface Tekne {
  kod: string;
  slug: string;
  ad: string;
  aciklama: string;
  tip: TekneTipi;
  lokasyon: string;
  gorsel: string;
  gorseller: string[];
  ozellikler: {
    kapasite: number;
    seyirKapasitesi: number;
    uzunluk: string;
    murettebat: number;
    kabin?: number;
    kaptanli: boolean;
  };
  fiyat: {
    saatlik: number;
    gunluk: number;
    konaklamali?: number;
  };
  puan: number;
  degerlendirmeSayisi: number;
  anindaRezerve: boolean;
  rozet?: string;
  donanim: string[];
}

export type Siralama =
  | "onerilen"
  | "fiyat-artan"
  | "fiyat-azalan"
  | "populer"
  | "puan";
