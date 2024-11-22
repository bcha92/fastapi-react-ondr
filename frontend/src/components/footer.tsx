import { MouseEventHandler } from "react";

const Footer = ({
  save,
  submit,
  saveHandler,
  submitHandler,
  disabled = false,
}: {
  save: string;
  submit: string;
  saveHandler: MouseEventHandler<HTMLButtonElement | undefined>;
  submitHandler: MouseEventHandler<HTMLButtonElement | undefined>;
  disabled?: boolean;
}) => {
  return (
    <footer className="flex flex-row w-full justify-end">
      <div />
      <button
        onClick={saveHandler}
        disabled={disabled}
        className={
          "font-bold px-5 py-3 m-4" + (disabled ? " cursor-not-allowed" : "")
        }
      >
        {save.toUpperCase()}
      </button>
      <button
        disabled={disabled}
        onClick={submitHandler}
        className={
          "font-bold px-5 py-3 border-solid border-[2px] m-4" +
          (disabled ? " cursor-not-allowed" : "")
        }
      >
        {submit.toUpperCase()}
      </button>
    </footer>
  );
};

export default Footer;
