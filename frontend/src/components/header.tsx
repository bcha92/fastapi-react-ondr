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
  headerLabel,
  setState,
  state,
  warning = [false, "", ""],
  save = "Save",
  val,
  valMessage,
}: {
  showTitle: string;
  isDisabled?: boolean;
  headerName: string;
  setState?: SetStateAction<Application>;
  state?: Application;
  warning?: [boolean, string, string];
  headerLabel?: string;
  save?: string;
  valMessage?: string;
}) => {
  const { toggleLang } = useContext(ThemeContext);
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(state?.app_name ?? "");

  return (
    <header className="flex flex-col items-center justify-between w-full pt-4">
      {warning[0] && (
        <div className={"absolute top-0 w-full text-center p-4 " + warning[2]}>
          <h3>{warning[1]}</h3>
        </div>
      )}
      <div className="flex flex-row items-center justify-between w-full pt-4">
        {editName ? (
          <div className="flex ">
            <Text
              id="app-name"
              label={`${headerLabel}: `}
              value={headerName}
              className="max-w-[300px]"
              onChange={(e) => {
                setName(e.target.value);
              }}
              onFocusOut={() => {
                setState({
                  ...state,
                  app_name: name.length > 0 ? name : state?.app_name,
                });
                setEditName(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setState({
                    ...state,
                    app_name: state?.app_name,
                  });
                  setEditName(false);
                } else if (e.key === "Enter" && name.length > 0) {
                  setState({
                    ...state,
                    app_name: name,
                  });
                  setEditName(false);
                }
              }}
              validation={name.length > 0 ? undefined : "error"}
              validationMessage={valMessage}
            />
            <button
              disabled={valMessage === "error"}
              className={
                "ml-4 p-3 bg-white text-black border-solid rounded-md" +
                (name.length === 0 ? " cursor-not-allowed" : "")
              }
              onClick={() => {
                setEditName(false);
              }}
            >
              {save}
            </button>
          </div>
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
      </div>
    </header>
  );
};

export default Header;
