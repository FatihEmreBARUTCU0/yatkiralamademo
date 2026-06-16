import Hero from "@/components/Hero";
import OneCikanTekneler from "@/components/OneCikanTekneler";
import PopulerLokasyonlar from "@/components/PopulerLokasyonlar";
import GuvenceBanner from "@/components/GuvenceBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import { tekneler } from "@/lib/tekneler";

export default function Home() {
  return (
    <>
      <Hero />
      <GuvenceBanner />
      <OneCikanTekneler tekneler={tekneler} />
      <PopulerLokasyonlar />
      <WhatsAppButton />
    </>
  );
}
