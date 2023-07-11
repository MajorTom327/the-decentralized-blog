import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Side from "./Side";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-2 py-2 h-full min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col lg:flex-row gap-2 px-2 lg:p-0">
          <div className="lg:w-3/4">{children}</div>
          <div className="lg:w-1/4">
            <Side />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

Layout.defaultProps = {};

export default Layout;
