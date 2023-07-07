import React, { useState } from "react";
import { Post } from "../contracts/Blog";
import useIpfs from "../hooks/useIpfs";

type Props = {
  children: React.ReactNode;
};

export type ArticleContextType = {
  selectedArticle: Post | null;
  setSelectedArticle: (article: Post) => void;
  content: string | null;
};

export const ArticleContext = React.createContext<ArticleContextType>(
  {} as ArticleContextType
);

export const ArticleProvider: React.FC<Props> = ({ children }) => {
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const ipfs = useIpfs();

  const context: ArticleContextType = {
    selectedArticle,
    setSelectedArticle: (article: Post) => {
      setSelectedArticle(article);
      void ipfs.getFile(article.ipfsUrl).then((file) => {
        setContent(file);
      });
    },
    content,
  };

  return (
    <>
      <ArticleContext.Provider value={context}>
        {children}
      </ArticleContext.Provider>
    </>
  );
};

ArticleProvider.defaultProps = {};

export default ArticleProvider;
