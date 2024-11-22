import { ChangeEventHandler } from "react";

const Selection = ({
  id,
  selections,
  defaultValue,
  label,
  disabled,
  onChange,
  required,
  validation,
  valMessage,
}: {
  id: string;
  selections: string[];
  defaultValue?: string;
  label?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  validation?: boolean;
  valMessage?: string;
}) => {
  return (
    <div
      className={"text-white " + (validation ? "border-red-500 border-2" : "")}
    >
      <label htmlFor={id}>
        {label && `${label} `}
        <select
          id={id}
          name={id}
          required={required}
          defaultValue={defaultValue}
          className="text-black text-lg "
          disabled={disabled}
          onChange={onChange}
        >
          {selections.map((value, k) => (
            <option key={`${value}-${k}`} id={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      {validation && <p className="text-red-500 text-xs">{valMessage}</p>}
    </div>
  );
};

export default Selection;
