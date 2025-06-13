"use client";

import { ThemeProvider } from "@emotion/react";
/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import Header from "./components/Header";
import { secBankTheme } from "@/styles/theme";
import HomeContent from "./home/home";

export default function Home() {
  return (
    <div className="grid font-[family-name:var(--font-geist-sans)] bg-[#EBEBEB] text-black w-screen h-screen">
      <ThemeProvider theme={secBankTheme}>
        <Header />
        <HomeContent />
      </ThemeProvider>
    </div>
  );
}
