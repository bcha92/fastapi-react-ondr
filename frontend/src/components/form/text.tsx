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
  className = "",
  inputClassName = "",
  validationMessage,
  validation,
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
  className?: string;
  inputClassName?: string;
  validationMessage?: string;
  validation?: string;
}) => (
  <label
    htmlFor={id}
    className={"flex flex-col w-full text-sm" + ` ${className}`}
  >
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
      className={
        "text-base " +
        inputClassName +
        (validation === "error" ? " border-2 border-rose-500" : "")
      }
    />
    {validation && (
      <p
        className={
          "text-xs " +
          (validation === "success"
            ? "text-green-700"
            : validation === "error"
            ? "text-red-700"
            : "")
        }
      >
        {validationMessage}
      </p>
    )}
  </label>
);

export default Text;
