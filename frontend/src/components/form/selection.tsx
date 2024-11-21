import { ChangeEventHandler } from "react";

const Selection = ({
  id,
  selections,
  defaultValue,
  label,
  disabled,
  onChange,
  required,
}: {
  id: string;
  selections: string[];
  defaultValue?: string;
  label?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
}) => {
  return (
    <div className="text-white">
      <label htmlFor={id}>
        {label && `${label} `}
        <select
          id={id}
          name={id}
          required={required}
          defaultValue={defaultValue}
          className="text-black"
          disabled={disabled}
          onChange={onChange}
        >
          {selections.map((value, k) => (
            <option key={`${value}-${k}`} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Selection;
