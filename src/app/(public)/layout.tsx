import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const FloatingContactWidget = dynamic(
  () =>
    import("@/components/layout/floating-contact-widget").then(
      (m) => m.FloatingContactWidget,
    ),
  { ssr: true },
);
const PageTransitionOverlay = dynamic(
  () =>
    import("@/components/layout/page-transition-overlay").then(
      (m) => m.PageTransitionOverlay,
    ),
  { ssr: true },
);

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingContactWidget />
      <PageTransitionOverlay />
    </div>
  );
}
