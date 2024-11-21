import type {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from "react";

const Text = ({
  id,
  label,
  value,
  inputType = "text",
  disabled,
  onChange,
  minNum,
  maxNum,
  onFocusOut,
  onKeyDown,
}: {
  id: string;
  label?: string;
  value?: string;
  inputType?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  minNum?: string | number;
  maxNum?: string | number;
  onFocusOut?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}) => (
  <label htmlFor={id}>
    {label}
    <input
      id={id}
      name={id}
      defaultValue={value}
      type={inputType}
      disabled={disabled}
      onChange={onChange}
      min={inputType === "number" && minNum ? minNum.toString() : undefined}
      max={inputType === "number" && maxNum ? maxNum.toString() : undefined}
      pattern={inputType === "number" ? "[0-9/s]*" : undefined}
      onBlur={onFocusOut}
      onKeyDown={onKeyDown}
    />
  </label>
);

export default Text;
