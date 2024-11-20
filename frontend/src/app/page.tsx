// @ts-nocheck
"use client";
import { useContext, useReducer, useEffect } from "react";
import { ThemeContext } from "./theme-provider";
import { text, getApplications } from "@/modules";
import { Header, HomeRoot, HomeOpen } from "../components";

const initState = { status: "idle", error: undefined, data: undefined };
function reducer(state, action) {
  return { status: action.type };
}

export default function Home() {
  const { home } = text;
  const { lang } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl text-center">{home.title[lang]}</h1>
        {/* <h2 className="text-2xl">H2 Text</h2>
        <h3 className="text-xl">H3 Text</h3>
        <h4 className="text-lg">H4 Text</h4> */}
        <p className="text-center">{home.subtitle[lang]}</p>
        <HomeRoot
          navSave={() => console.log("Navigate to Save")}
          navCreate={() => console.log("Navigate to Create")}
        />
        <HomeOpen backOnClick={() => console.log("Back Button")} />
      </main>
    </div>
  );
}
