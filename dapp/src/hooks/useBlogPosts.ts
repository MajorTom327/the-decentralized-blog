import { useEffect, useState } from "react";
import { Post } from "../contracts/Blog";
import { useBlog } from "../contexts/BlogProvider";

export const useBlogPosts = () => {
  const [postCount, setPostCount] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  const blog = useBlog();

  useEffect(() => {
    const getPostCount = async () => {
      const count = await blog?.getPostCount();
      setPostCount(count || 0);
    };
    void getPostCount();
  }, [blog]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await blog?.getPosts();
      setPosts(posts || []);
    };
    void getPosts();
  }, [blog]);

  return {
    count: postCount,
    posts,
  };
};

export default useBlogPosts;
