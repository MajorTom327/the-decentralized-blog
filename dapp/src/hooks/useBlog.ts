import { useEffect, useState } from "react";
import { blog } from "../contracts";
import { Post } from "../contracts/Blog";

export const useBlog = () => {
  const [postCount, setPostCount] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPostCount = async () => {
      const count = await blog.getPostCount();
      console.log("getPostCount", { count });
      setPostCount(count);
    };
    void getPostCount();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await blog.getPosts();
      setPosts(posts);
    };
    void getPosts();
  }, []);

  return {
    count: postCount,
    posts,
  };
};

export default useBlog;
