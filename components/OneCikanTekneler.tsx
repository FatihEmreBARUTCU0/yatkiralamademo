import Link from "next/link";
import TekneListelemeKarti from "./TekneListelemeKarti";
import type { Tekne } from "@/types/tekne";

export default function OneCikanTekneler({ tekneler }: { tekneler: Tekne[] }) {
  const oneCikan = tekneler.slice(0, 3);

  return (
    <section id="one-cikan-tekneler" className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-gold">
              Filomuz
            </p>
            <h2 className="font-serif text-3xl font-light tracking-wide text-white sm:text-5xl">
              Öne Çıkan Tekneler
            </h2>
          </div>
          <Link
            href="/tekne-kiralama"
            className="border border-gold/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-navy"
          >
            Tümünü Gör ({tekneler.length})
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {oneCikan.map((tekne) => (
            <TekneListelemeKarti key={tekne.kod} tekne={tekne} />
          ))}
        </div>
      </div>
    </section>
  );
}
