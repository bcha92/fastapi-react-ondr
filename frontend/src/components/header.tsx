// @ts-nocheck
"use client";
import { useContext } from "react";
import { ThemeContext } from "../app/theme-provider";
import Toggle from "./toggle";

const Header = ({ showTitle = "" }: { showTitle?: string }) => {
  const { toggleLang } = useContext(ThemeContext);
  return (
    <header className="flex flex-row items-center justify-between w-full pt-4">
      <h2 className={showTitle.length > 0 ? "cursor-pointer" : ""}>
        {showTitle}
      </h2>
      {/* TODO Enable Light/Dark Mode */}
      <div>
        {/* <Toggle onClick={toggleTheme} labelLeft="Dark" labelRight="Light" /> */}
        <Toggle onClick={toggleLang} labelLeft="EN" labelRight="FR" />
      </div>
    </header>
  );
};

export default Header;
