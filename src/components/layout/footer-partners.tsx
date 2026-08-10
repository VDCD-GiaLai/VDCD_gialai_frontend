"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  fetchPartnersFromApi,
  PartnerItem,
  MOCK_PARTNERS,
} from "@/services/partner.service";

export function FooterPartners() {
  const pathname = usePathname();
  const [partners, setPartners] = useState<PartnerItem[]>(MOCK_PARTNERS);

  useEffect(() => {
    if (pathname === "/") return;
    let isMounted = true;
    fetchPartnersFromApi().then((data) => {
      if (isMounted && data && data.length > 0) {
        setPartners(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="w-full border-t-2 border-slate-200/80 dark:border-zinc-800 py-3 mt-4">
      <div className="max-w-[1600px] mx-auto px-0">
        {/* Monochrome Logo Grid — Arranged into 2 clean rows on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3 md:gap-4 lg:gap-6 items-center justify-items-center">
          {partners.map((p, idx) => (
            <div
              key={p.id || idx}
              className="group flex items-center justify-center p-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
              title={p.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-12 md:max-h-14 lg:max-h-16 max-w-[140px] w-auto object-contain pointer-events-none select-none grayscale opacity-60 dark:opacity-75 dark:invert-[0.1] group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
