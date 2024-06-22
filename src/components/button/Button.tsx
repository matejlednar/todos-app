import classNames from "classnames";
import { ReactNode } from "react";
import "./Button.css";

// Button with icon support

const Button = ({
  action,
  label,
  className,
  children,
  disabled,
  type = "button",
}: {
  action?: () => void;
  label: string;
  className?: string;
  children?: ReactNode; // icon
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  const defaultCSS =
    "app-button shadow-md rounded-md bg-black/80 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/75 flex items-center gap-2";
  const css = className
    ? classNames(defaultCSS, className, {
        "disabled cursor-not-allowed": disabled,
      })
    : defaultCSS;

  return (
    <button
      tabIndex={0}
      type={type}
      disabled={disabled}
      onClick={action}
      className={css}
    >
      {children}
      {label}
    </button>
  );
};

export default Button;
