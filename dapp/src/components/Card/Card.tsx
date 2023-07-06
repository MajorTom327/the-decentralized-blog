import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Card: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="border rounded bg-base-200 text-base-200-content p-4 shadow">
        {children}
      </div>
    </>
  );
};

Card.defaultProps = {};

export default Card;
