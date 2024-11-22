// @ts-nocheck
"use client";
import { useContext, useReducer, useEffect, useState } from "react";
import { ThemeContext } from "./theme-provider";
import { text, getApplications, getInitState, reducer } from "@/utils";
import { Header, HomeRoot, HomeOpen, HomeNew } from "../components";

export default function Home() {
  const { home } = text;
  const { lang }: { lang: string } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, getInitState);
  const [resume, setResume] = useState(false);
  const [newForm, setNewForm] = useState(false);
  useEffect(() => {
    if (state.status === "idle") {
      getApplications(dispatch);
    }
  }, [state.status]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl text-center">{home.title[lang]}</h1>
        {/* <h2 className="text-2xl">H2 Text</h2>
        <h3 className="text-xl">H3 Text</h3>
        <h4 className="text-lg">H4 Text</h4> */}
        <p className="text-center">{home.subtitle[lang]}</p>
        {resume ? (
          <HomeOpen
            backOnClick={() => setResume(false)}
            state={state}
            text={home}
            lang={lang}
          />
        ) : newForm ? (
          <HomeNew
            backOnClick={() => setNewForm(false)}
            state={state}
            text={home}
            lang={lang}
          />
        ) : (
          <HomeRoot
            navSave={() => setResume(true)}
            navCreate={() => setNewForm(true)}
            state={state}
            text={home}
            lang={lang}
          />
        )}
      </main>
    </div>
  );
}
