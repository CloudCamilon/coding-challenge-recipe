"use client";

/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import { secBankTheme } from "@/styles/theme";
import HomeContent from "./home/home";
import { ThemeProvider } from "@emotion/react";

/**
 * Page app and starting point of application.
 * Hosts the Theme Provider and Home Content as
 * landing page.
 */
export default function Home() {
  return (
    <div className="grid font-[family-name:var(--font-geist-sans)] bg-[#EBEBEB] text-black w-screen h-screen">
      <ThemeProvider theme={secBankTheme}>
        <HomeContent />
      </ThemeProvider>
    </div>
  );
}
