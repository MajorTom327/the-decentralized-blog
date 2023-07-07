import React from "react";
import Card from "../Card/Card";

export const EmptyArticle: React.FC = () => {
  return (
    <>
      <Card>
        <h1 className="text-2xl text-center">Empty Article</h1>
      </Card>
    </>
  );
};

EmptyArticle.defaultProps = {};

export default EmptyArticle;
