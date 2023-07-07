import React from "react";

type Props = {
  children: React.ReactNode;
};

export type ArticleContextType = {};

export const ArticleContext = React.createContext<ArticleContextType | null>(
  null
);

export const ArticleProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ArticleContext.Provider value={{}}>{children}</ArticleContext.Provider>
    </>
  );
};

ArticleProvider.defaultProps = {};

export default ArticleProvider;
