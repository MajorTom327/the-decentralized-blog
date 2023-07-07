import React from "react";
import Card from "../Card";
import useBlog from "../../hooks/useBlog";
import { Post } from "../../contracts/Blog";
import classNames from "classnames";
import { DateTime } from "luxon";

type MenuItemProps = {
  children: React.ReactNode;
  disabled?: boolean;
  timestamp?: number;
};

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  timestamp,
  disabled,
}) => {
  return (
    <li>
      <button
        className={classNames("w-full p-2 transition rounded group", {
          "hover:bg-primary hover:text-primary-content cursor-pointer text-left hover:cursor-pointer":
            !disabled,
          "text-neutral/30 cursor-default text-center": disabled,
        })}
      >
        {children}
        {timestamp && (
          <span className="float-right text-neutral/50 group-hover:text-primary-content/75">
            {DateTime.fromSeconds(timestamp).toLocaleString(
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
      <aside className="w-full">
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
                <MenuItem key={article.ipfsUrl} timestamp={article.timestamp}>
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
