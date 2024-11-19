import { Add, Undo, FolderOpen } from "@mui/icons-material";
import type { MouseEventHandler } from "react";
import Card from "./card";

export const HomeRoot = ({
  navSave,
  navCreate,
}: {
  navSave: MouseEventHandler<HTMLButtonElement>;
  navCreate: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex flex-row">
      <Card
        name="Resume"
        iconDynamic={<FolderOpen className="text-black" />}
        onClick={navSave}
      />
      <Card
        name="New"
        iconStatic={<Add className="text-black" />}
        onClick={navCreate}
      />
    </div>
  );
};

export const HomeOpen = ({
  backOnClick,
}: {
  backOnClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className="flex flex-row">
    <Card
      name="Back"
      iconStatic={<Undo className="text-black" />}
      onClick={backOnClick}
    />
    <Card name="Hello" /> {/* TO REMOVE */}
  </div>
);
