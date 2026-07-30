"use client";

import * as React from "react";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import { ContactMap } from "./contact-map";

export function ContactPageContent() {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
