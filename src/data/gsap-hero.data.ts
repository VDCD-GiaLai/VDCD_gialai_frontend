import { MOCK_HERO_SLIDES } from "@/data/hero.data";

export interface GsapHeroSlide {
  place: string;
  title: string;
  title2: string;
  desc: string;
  image: string;
  id?: string;
  ctaText?: string;
  ctaUrl?: string;
}

function splitTitle(raw: string): [string, string] {
  if (raw.includes("\n")) {
    const [line1, ...rest] = raw.split("\n");
    return [line1, rest.join(" ")];
  }
  const parts = raw.split(" ");
  const mid = Math.ceil(parts.length / 2);
  return [
    parts.slice(0, mid).join(" "),
    parts.slice(mid).join(" ") || "Dự án VDCD",
  ];
}

export const GSAP_HERO_SLIDES: GsapHeroSlide[] = MOCK_HERO_SLIDES.map((s) => {
  const [title, title2] = splitTitle(s.title);
  return {
    id: s.id,
    title,
    title2,
    desc:
      s.description || "Tập đoàn VDCD - Giám sát công trình & Chuyển đổi số",
    image: s.image || "",
    place: s.subtitle || s.location || "",
    ctaText: s.ctaText || "Tìm hiểu thêm",
    ctaUrl: s.ctaUrl || "/#",
  };
});
