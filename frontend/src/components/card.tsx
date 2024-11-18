import { MouseEventHandler } from "react";

const Card = ({
  name,
  mainClick,
  secondaryClick,
}: {
  name: string;
  mainClick?: MouseEventHandler<HTMLInputElement>;
  secondaryClick?: MouseEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="flex flex-col bg-white opacity-70 m-2">
      <button>
        <h3 className="text-black">{name}</h3>
      </button>
      <button>Trash</button>
    </div>
  );
};

export default Card;
