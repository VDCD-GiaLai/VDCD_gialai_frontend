import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContactWidget } from "@/components/layout/floating-contact-widget";
import { PageTransitionOverlay } from "@/components/layout/page-transition-overlay";

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
