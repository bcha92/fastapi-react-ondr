import type { ChangeEventHandler } from "react";
import type { RadioSchema } from "@/utils";

const Radio = ({
  id,
  selections,
  onChange,
  disabled,
  defaultValue,
}: {
  id: string;
  selections: RadioSchema[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  defaultValue?: string;
}) => {
  return (
    <div>
      {selections.map((selection, i) => {
        return (
          <label key={`${selection.label}-${i}`} htmlFor={selection.value}>
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
  );
};

export default Radio;
