import React, { Suspense, useContext } from "react";
import { ArticleContext } from "../../contexts/ArticleProvider";
import { prop } from "ramda";
import { isNilOrEmpty } from "ramda-adjunct";
import Card from "../Card/Card";
import EmptyArticle from "./EmptyArticle";
import { DateTime } from "luxon";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ReactMarkdown = React.lazy(() =>
  import("react-markdown/lib/react-markdown").then((module) => ({
    default: module.ReactMarkdown,
  }))
);

export const ArticleContent: React.FC = () => {
  const ctx = useContext(ArticleContext);

  if (isNilOrEmpty(prop("content", ctx))) {
    return <EmptyArticle />;
  }
  return (
    <>
      <Card className="relative">
        <div className="absolute top-3 right-3  text-lg">
          {DateTime.fromSeconds(ctx.selectedArticle!.timestamp).toLocaleString(
            DateTime.DATE_SHORT
          )}
        </div>
        <div className="flex w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMarkdown
              className="prose w-full"
              children={prop<string>("content", ctx)}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, "")}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      style={solarizedlight}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </Suspense>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 border-t pt-2 text-neutral/80">
          <div>Retrieve the article on IPFS:</div>
          <a
            className="font-semibold hover:underline"
            target="_blank"
            href={`ipfs://${ctx.selectedArticle?.ipfsUrl || ""}`}
          >
            ipfs://{ctx.selectedArticle?.ipfsUrl}
          </a>
        </div>
      </Card>
    </>
  );
};

ArticleContent.defaultProps = {};

export default ArticleContent;
