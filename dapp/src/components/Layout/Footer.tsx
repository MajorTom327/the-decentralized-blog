import React from "react";

export const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <div className="flex w-full justify-center p-2 bg-primary text-primary-content rounded">
          <h1 className="text-2xl">The Decentralized Blog</h1>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
