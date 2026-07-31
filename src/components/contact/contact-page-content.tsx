"use client";

import * as React from "react";
import { PageHeroBanner } from "@/components/ui/page-hero-banner";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import { ContactMap } from "./contact-map";

export function ContactPageContent() {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <PageHeroBanner pageKey="contact" />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
