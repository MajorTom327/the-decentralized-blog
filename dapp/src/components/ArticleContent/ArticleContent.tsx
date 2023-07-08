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

        <div className="flex flex-col items-center justify-center mt-4 border-t pt-2 text-neutral/80">
          <div>Retrieve the article on IPFS:</div>
          <div className="font-semibold">
            ipfs://{ctx.selectedArticle?.ipfsUrl}
          </div>
        </div>
      </Card>
    </>
  );
};

ArticleContent.defaultProps = {};

export default ArticleContent;
