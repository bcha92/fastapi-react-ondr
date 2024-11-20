import { Add, Undo, FolderOpen } from "@mui/icons-material";
import type { MouseEventHandler } from "react";
import { Application, ReducerState } from "@/utils/model";
import Card from "./card";

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
  text: object;
  lang: string;
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
  text: object;
  lang: string;
}) => (
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
            onClick={() => console.log(app.id)}
            loading={state.status === "loading"}
            loaded={state.status === "done" && state.data !== undefined}
            disabled={state.status !== "done" || state.error !== undefined}
          />
        ))
        .reverse() // shows desc order (most recent -> older)
    ) : (
      <Card
        name={
          state.status === "loading" ? text.loading[lang] : text.notFound[lang]
        }
      />
    )}
  </div>
);
