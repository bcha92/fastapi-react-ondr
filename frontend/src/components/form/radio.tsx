import type { ChangeEventHandler } from "react";
import type { RadioSchema } from "@/utils";

const Radio = ({
  id,
  title,
  selections,
  onChange,
  disabled,
  defaultValue,
  validation,
  valMessage,
}: {
  id: string;
  title: string;
  selections: RadioSchema[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  defaultValue?: string;
  validation?: boolean;
  valMessage?: string;
}) => {
  return (
    <div
      className={
        "flex flex-col items-center " +
        (validation ? "border-2 border-red-500" : "")
      }
    >
      <label>{title}</label>
      <div>
        {selections.map((selection, i) => {
          return (
            <label
              key={`${selection.label}-${i}`}
              htmlFor={selection.value}
              className="ml-4 mr-4 max-w-[200px]"
            >
              <input
                type="radio"
                id={selection.value}
                name={id}
                disabled={disabled}
                className="inline"
                onChange={onChange}
                defaultChecked={defaultValue === selection.value}
              />
              {` ${selection.label}`}
            </label>
          );
        })}
      </div>
      {validation && <p className="text-red-500 text-xs">Required</p>}
    </div>
  );
};

export default Radio;
