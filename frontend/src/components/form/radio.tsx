import type { ChangeEventHandler } from "react";
import type { RadioSchema } from "@/utils";

const Radio = ({
  id,
  title,
  selections,
  onChange,
  disabled,
  defaultValue,
}: {
  id: string;
  title: string;
  selections: RadioSchema[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  defaultValue?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
};

export default Radio;
