const Input = ({
  id,
  label,
  value,
  inputType = "text",
  disabled,
}: {
  id: string;
  label?: string;
  value?: string;
  inputType?: string;
  disabled?: boolean;
}) => (
  <label htmlFor={id}>
    {label}
    <input
      id={id}
      name={id}
      defaultValue={value}
      type={inputType}
      disabled={disabled}
    />
  </label>
);

export default Input;
