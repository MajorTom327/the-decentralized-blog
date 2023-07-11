import React, { useContext, useEffect, useMemo, useState } from "react";
import Blog from "../contracts/Blog";
import { environment } from "../lib/constants";
import { useWalletConnectClient } from "./ClientContext";

export type BlogContextType = {
  blog: Blog | undefined;
};

export const BlogContext = React.createContext<BlogContextType>(
  {} as BlogContextType
);

type ProviderProps = {
  children: React.ReactNode;
};

export const BlogProvider: React.FC<ProviderProps> = ({ children }) => {
  const { web3Provider } = useWalletConnectClient();

  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    if (web3Provider) {
      const localBlog = new Blog(environment.CONTRACTS.BLOG, web3Provider);
      setBlog(localBlog);
    }
  }, [web3Provider]);

  return (
    <BlogContext.Provider value={{ blog }}>{children}</BlogContext.Provider>
  );
};

export const useBlog = () => {
  const { blog } = useContext(BlogContext);

  return blog;
};
