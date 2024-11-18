import { MouseEventHandler } from "react";
import "./toggle.css";

// Custom Toggle Switch Component
const Toggle = ({
  onClick,
  labelLeft,
  labelRight,
}: {
  onClick?: MouseEventHandler<HTMLInputElement>;
  labelLeft?: string;
  labelRight?: string;
}) => (
  <div className="flex text-center">
    {labelLeft && <label className="pt-1">{labelLeft}</label>}
    <label className="relative inline-block">
      <input type="checkbox" className="opacity-0 w-0 h-0" onClick={onClick} />
      <span
        className={
          "absolute cursor-pointer top-0 left-0 right-0 bottom-0 before:absolute before:content-[''] before:bg-white"
        }
      ></span>
    </label>
    {labelRight && <label className="pt-1">{labelRight}</label>}
  </div>
);

export default Toggle;
