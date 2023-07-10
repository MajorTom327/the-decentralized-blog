import React, { useContext } from "react";
import Card from "../Card";
import useBlog from "../../hooks/useBlog";
import { Post } from "../../contracts/Blog";
import classNames from "classnames";
import { DateTime } from "luxon";
import { ArticleContext } from "../../contexts/ArticleProvider";
import { isNotNil } from "ramda";
import Donate from "./Donate";

type MenuItemProps = {
  children: React.ReactNode;
  disabled?: boolean;
  post?: Post;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, disabled, post }) => {
  const articleCtx = useContext(ArticleContext);
  return (
    <li>
      <button
        onClick={() => {
          if (!disabled && isNotNil(post)) {
            articleCtx.setSelectedArticle({
              ...post,
              // ipfsUrl: "QmWvLWsr7eotz26hNfG2hgiFPNs2bxMZQjek7kw65cLpqR",
              ipfsUrl: "QmQgs1NfzBim1VGskhLKeRJG2Kjj1BR7yF6LhRhAbVbfpr",
            });
          }
        }}
        className={classNames("w-full p-2 transition rounded group", {
          "hover:bg-primary hover:text-primary-content cursor-pointer text-left hover:cursor-pointer":
            !disabled,
          "text-neutral/30 cursor-default text-center": disabled,
        })}
      >
        {children}
        {post?.timestamp && (
          <span className="float-right text-neutral/50 group-hover:text-primary-content/75">
            {DateTime.fromSeconds(post.timestamp).toLocaleString(
              DateTime.DATE_SHORT
            )}
          </span>
        )}
      </button>
    </li>
  );
};

export const Side: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const { count, posts } = useBlog();

  const cleanArticles = posts.filter((article: Post) => {
    return article.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <aside className="w-full flex flex-col gap-2">
        <Donate />

        <Card>
          <h1 className="text-blue-500 text-2xl text-center mb-2">
            Articles ({count}):
          </h1>
          <nav>
            <input
              type="text"
              className="w-full p-2 rounded mb-2"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
              {cleanArticles.map((article: Post) => (
                <MenuItem key={article.ipfsUrl} post={article}>
                  {article.title}
                </MenuItem>
              ))}

              {cleanArticles.length === 0 && (
                <MenuItem disabled>No articles found</MenuItem>
              )}
            </ul>
          </nav>
        </Card>
      </aside>
    </>
  );
};

Side.defaultProps = {};

export default Side;
