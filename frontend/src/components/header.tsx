// @ts-nocheck
"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "../app/theme-provider";
import Toggle from "./toggle";
import { Text } from "./";
import { Application } from "@/utils";

const Header = ({
  showTitle = "",
  isDisabled = false,
  headerName,
  setState,
  state,
}: {
  showTitle: string;
  isDisabled?: boolean;
  headerName: string;
  setState?: SetStateAction<Application>;
  state?: Application;
}) => {
  const { toggleLang } = useContext(ThemeContext);
  const [editName, setEditName] = useState(false);

  return (
    <header className="flex flex-row items-center justify-between w-full pt-4">
      {editName ? (
        <Text
          id="app-name"
          label="App Name: "
          value={headerName}
          onChange={(e) => {
            setState({ ...state, app_name: e.target.value });
          }}
          onFocusOut={() => {
            setEditName(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditName(false);
            }
          }}
        />
      ) : (
        <button
          className={isDisabled ? "cursor-default" : "cursor-pointer"}
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              setEditName(true);
            }
          }}
        >
          <h2>{showTitle}</h2>
        </button>
      )}
      {/* TODO Enable Light/Dark Mode */}
      <div>
        {/* <Toggle onClick={toggleTheme} labelLeft="Dark" labelRight="Light" /> */}
        <Toggle onClick={toggleLang} labelLeft="EN" labelRight="FR" />
      </div>
    </header>
  );
};

export default Header;
