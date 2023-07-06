import React from "react";
import Card from "../Card";
import articles from "../../data/articles";

type MenuItemProps = {
  children: React.ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return (
    <li>
      <button className="w-full p-2 transition hover:bg-primary hover:text-primary-content cursor-pointer rounded text-left">
        {children}
      </button>
    </li>
  );
};

export const Side: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");

  const cleanArticles = articles.filter((article) => {
    return article.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Card>
        <h1 className="text-blue-500 text-2xl">Last articles:</h1>
        <nav>
          <input
            type="text"
            className="w-full p-2 rounded"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul>
            {cleanArticles.map((article) => (
              <MenuItem key={article.id}>{article.title}</MenuItem>
            ))}
          </ul>
        </nav>
      </Card>
    </>
  );
};

Side.defaultProps = {};

export default Side;
