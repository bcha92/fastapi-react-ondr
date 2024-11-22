import { Add, Undo, FolderOpen } from "@mui/icons-material";
import { type MouseEventHandler, useState, useReducer, Context } from "react";
import { useRouter } from "next/navigation";
import {
  Application,
  ReducerState,
  createApplication,
  getInitState,
  reducer,
  TextHomeContext,
  LangThemeContext,
} from "@/utils";
import Card from "./card";
import Text from "./form/text";

export const HomeRoot = ({
  navSave,
  navCreate,
  state,
  text,
  lang,
}: {
  navSave: MouseEventHandler<HTMLButtonElement>;
  navCreate: MouseEventHandler<HTMLButtonElement>;
  state: ReducerState;
  text: TextHomeContext;
  lang: LangThemeContext;
}) => {
  return (
    <div className="flex flex-row">
      <Card
        name={
          state.status === "idle"
            ? text.wait[lang]
            : state.status === "loading"
            ? text.loading[lang]
            : state.status === "done"
            ? text.resume[lang]
            : text.notFound[lang]
        }
        iconDynamic={<FolderOpen className="text-black" />}
        onClick={navSave}
        loading={state.status === "loading"}
        loaded={state.status === "done" && state.data !== undefined}
        disabled={state.status !== "done" || state.error !== undefined}
      />
      <Card
        name={text.new[lang]}
        iconStatic={<Add className="text-black" />}
        onClick={navCreate}
      />
    </div>
  );
};

export const HomeOpen = ({
  backOnClick,
  state,
  text,
  lang,
}: {
  backOnClick: MouseEventHandler<HTMLButtonElement>;
  state: ReducerState;
  text: TextHomeContext;
  lang: LangThemeContext;
}) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3">
      <Card
        name={text.back[lang]}
        iconStatic={<Undo className="text-black" />}
        onClick={backOnClick}
      />
      {state.data && state.data.body.length > 0 ? (
        state.data.body
          .map((app: Application) => (
            <Card
              key={app.id}
              name={app.app_name}
              // TODO
              onClick={() => router.push(`/form/${app.id}`)}
              loading={state.status === "loading"}
              loaded={state.status === "done" && state.data !== undefined}
              disabled={state.status !== "done" || state.error !== undefined}
            />
          ))
          .reverse() // shows desc order (most recent -> older)
      ) : (
        <Card
          name={
            state.status === "loading"
              ? text.loading[lang]
              : text.notFound[lang]
          }
        />
      )}
    </div>
  );
};

export const HomeNew = ({
  backOnClick,
  text,
  lang,
}: {
  backOnClick: MouseEventHandler<HTMLButtonElement>;
  text: TextHomeContext;
  lang: LangThemeContext;
}) => {
  const [appName, setAppName] = useState("");
  const [state, dispatch] = useReducer(reducer, getInitState);
  const router = useRouter();

  if (state.status === "done") {
    router.push(`/form/${state.data.body.id}`);
  }
  return (
    <div className="flex flex-col items-center w-full">
      <Text
        id="app_name"
        onChange={(e) => {
          setAppName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createApplication(dispatch, { app_name: appName });
          }
        }}
        label={text.new_application_name[lang]}
        validation={
          state.status === "done"
            ? "success"
            : state.status === "error"
            ? "error"
            : undefined
        }
        validationMessage={
          state.status === "done"
            ? text.new_application_name.res[lang]
            : state.status === "error"
            ? text.new_application_name.err[lang]
            : undefined
        }
        className="items-center"
        inputClassName="max-w-[300px]"
      />

      <div className="mt-4">
        <Card
          name={text.create[lang]}
          iconStatic={<Add className="text-black" />}
          onClick={() => createApplication(dispatch, { app_name: appName })}
        />
        <Card
          name={text.back[lang]}
          iconStatic={<Undo className="text-black" />}
          onClick={backOnClick}
        />
      </div>
    </div>
  );
};
