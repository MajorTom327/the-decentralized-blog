import React, { useContext } from "react";
import { ArticleContext } from "../../contexts/ArticleProvider";
import { prop } from "ramda";
import { isNilOrEmpty } from "ramda-adjunct";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Card from "../Card/Card";
import EmptyArticle from "./EmptyArticle";
import { DateTime } from "luxon";

export const ArticleContent: React.FC = () => {
  const ctx = useContext(ArticleContext);

  if (isNilOrEmpty(prop("content", ctx))) {
    return <EmptyArticle />;
  }
  return (
    <>
      <Card>
        <div className="float-right text-lg">
          {DateTime.fromSeconds(ctx.selectedArticle!.timestamp).toLocaleString(
            DateTime.DATE_SHORT
          )}
        </div>
        <ReactMarkdown
          className="prose"
          children={prop<string>("content", ctx)}
        />
      </Card>
    </>
  );
};

ArticleContent.defaultProps = {};

export default ArticleContent;
