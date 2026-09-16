"use client";

import * as React from "react";

export function FooterSolutionsLink() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("open-mega-menu"));
      }}
      className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5 text-left cursor-pointer"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
        Giải pháp công nghệ
      </span>
    </button>
  );
}
