import { ChangeEventHandler } from "react";

const Selection = ({
  id,
  selections,
  defaultValue = "ON",
  label,
  disabled,
  onChange,
}: {
  id: string;
  selections: string[];
  defaultValue: string;
  label?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <div className="text-white">
      <label htmlFor={id}>
        {`${label} `}
        <select
          id={id}
          name={id}
          required
          defaultValue={defaultValue}
          className="text-black"
          disabled={disabled}
          onChange={onChange}
        >
          {selections.map((province, k) => (
            <option key={`${province}-${k}`} value={province}>
              {province}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Selection;
