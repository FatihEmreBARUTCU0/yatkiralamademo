import { Suspense } from "react";
import TekneListesi from "@/components/TekneListesi";
import SeoIcerik from "@/components/SeoIcerik";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tekne Kiralama Fiyatları | Premium Yat Kiralama",
  description:
    "İstanbul, Bodrum, Göcek, Fethiye ve daha fazlasında saatlik, günübirlik ve konaklamalı tekne kiralama. Filtrele, karşılaştır ve hemen rezerve et.",
};

function Yukleniyor() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-white/50">Tekneler yükleniyor...</p>
    </div>
  );
}

export default function TekneKiralamaPage() {
  return (
    <>
      <Suspense fallback={<Yukleniyor />}>
        <TekneListesi />
      </Suspense>
      <SeoIcerik />
    </>
  );
}
