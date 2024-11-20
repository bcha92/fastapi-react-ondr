import { MouseEventHandler, ReactNode } from "react";
import { Save, RemoveCircleOutline, MoreHoriz } from "@mui/icons-material";
import "./mui-icon.css";

const Card = ({
  name,
  onClick,
  disabled,
  loading,
  loaded,
  iconStatic,
  iconDynamic = <Save className="text-black" />,
}: {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  loaded?: boolean;
  iconStatic?: ReactNode;
  iconDynamic?: ReactNode;
}) => {
  const inheritedClassNames =
    iconStatic || loaded
      ? "text-black"
      : loading
      ? "text-grey"
      : disabled
      ? "text-rose-900"
      : "text-black";
  return (
    <button
      onClick={onClick}
      className={
        (iconStatic || loaded
          ? "cursor-pointer opacity-70"
          : loading
          ? "cursor-wait opacity-60"
          : disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer opacity-70") +
        "flex flex-col justify-center bg-white m-4 p-2 min-w-[100px] min-h-[100px] max-w-[120px] hover:opacity-100"
      }
      disabled={loading || disabled}
    >
      {iconStatic ??
        (loaded ? (
          iconDynamic
        ) : loading ? (
          <MoreHoriz className={inheritedClassNames} />
        ) : disabled ? (
          <RemoveCircleOutline className={inheritedClassNames} />
        ) : (
          <MoreHoriz className={inheritedClassNames} />
        ))}
      <h3 className={inheritedClassNames}>{name}</h3>
    </button>
  );
};

export default Card;
