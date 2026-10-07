import { GsapHero } from "@/components/landing/gsap-hero/gsap-hero";
import { ClientDeferredWrapper } from "@/components/landing/client-deferred-wrapper";
import {
  fetchHeroSlidesFromApi,
  MOCK_HERO_SLIDES,
} from "@/services/hero.service";

export const revalidate = 60;

export default async function LandingPage() {
  const heroSlides = await fetchHeroSlidesFromApi().catch(() => null);
  const activeSlides = heroSlides?.length ? heroSlides : MOCK_HERO_SLIDES;

  return (
    <div className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <GsapHero initialSlides={activeSlides} />

      {/* Below-the-fold content deferred to prioritize LCP on mobile & desktop */}
      <ClientDeferredWrapper />
    </div>
  );
}
