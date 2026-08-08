"use client";

import { ImageKitProvider as IKProvider } from "@imagekit/next";

const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
  "https://ik.imagekit.io/po0s6zxoj";

export function ImageKitWrapper({ children }: { children: React.ReactNode }) {
  return (
    <IKProvider urlEndpoint={IMAGEKIT_URL_ENDPOINT}>{children}</IKProvider>
  );
}
