import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <>
      <div
        className={classNames(
          "border rounded bg-base-200 text-base-200-content p-4 shadow",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

Card.defaultProps = {};

export default Card;
