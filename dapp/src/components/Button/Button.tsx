import classNames from "classnames";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  className,
  type,
  disabled,
  loading,
}) => {
  const classes = classNames(
    "p-2 rounded bg-primary text-primary-content w-full",
    {
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );
  return (
    <>
      <button className={classes} type={type} disabled={disabled}>
        {loading && (
          <AiOutlineLoading3Quarters className="animate-spin float-left my-1" />
        )}
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
