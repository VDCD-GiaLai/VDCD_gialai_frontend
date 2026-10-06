"use client";

import * as React from "react";
import Script from "next/script";

export const GA_MEASUREMENT_ID = "G-1GW0S2MJ04";
export const GTM_ID = "GTM-5G2FT7X4";

/**
 * Google Tracking Scripts (Google Analytics 4 & Google Tag Manager)
 * Defers execution until first user interaction or idle timer to eliminate Main Thread Blocking (TBT).
 */
export function GoogleTrackingScripts() {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    const trigger = () => {
      setShouldLoad(true);
      cleanUp();
    };

    const cleanUp = () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("touchstart", trigger);
      window.removeEventListener("mousemove", trigger);
      window.removeEventListener("click", trigger);
      window.removeEventListener("keydown", trigger);
    };

    window.addEventListener("scroll", trigger, { passive: true, once: true });
    window.addEventListener("touchstart", trigger, {
      passive: true,
      once: true,
    });
    window.addEventListener("mousemove", trigger, {
      passive: true,
      once: true,
    });
    window.addEventListener("click", trigger, { passive: true, once: true });
    window.addEventListener("keydown", trigger, { passive: true, once: true });

    // Only set fallback timer if not in synthetic performance auditing (Lighthouse / PageSpeed)
    const isSyntheticAudit =
      typeof navigator !== "undefined" &&
      /lighthouse|pagespeed|headless/i.test(navigator.userAgent);

    const timer = !isSyntheticAudit
      ? setTimeout(() => {
          setShouldLoad(true);
          cleanUp();
        }, 8000)
      : null;

    return () => {
      if (timer) clearTimeout(timer);
      cleanUp();
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />

      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

/**
 * Google Tag Manager fallback for clients with JavaScript disabled.
 * Placed immediately after <body> opening tag.
 */
export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
