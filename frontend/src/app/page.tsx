// @ts-nocheck
"use client";
import { useContext } from "react";
import { ThemeContext } from "./theme-provider";
import { text, PageText, TextLang } from "@/modules";
import { Header, Card } from "../components";

export default function Home() {
  const { home } = text;
  const { lang } = useContext(ThemeContext);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl">{home.title[lang]}</h1>
        {/* <h2 className="text-2xl">H2 Text</h2>
        <h3 className="text-xl">H3 Text</h3>
        <h4 className="text-lg">H4 Text</h4> */}
        <p>{home.subtitle[lang]}</p>
        <div className="flex flex-row">
          <Card name="Resume" />
          <Card name="New" />
        </div>
      </main>
    </div>
  );
}
