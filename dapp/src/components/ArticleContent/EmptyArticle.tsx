import React from "react";
import Card from "../Card/Card";
import { FaArrowRight } from "react-icons/fa";

export const EmptyArticle: React.FC = () => {
  return (
    <>
      <Card className="prose">
        <h1>Welcome to the Decentralized Blog !</h1>

        <p>
          Here we are, you are on the Decentralized Blog, a blog that is totally
          decentralized. No server, no database, no backend, no cookies, no
          tracking, no ads, no bullshit. Just a frontend that is served by IPFS
          and a smart contract that is deployed on the blockchain.
        </p>

        <p>
          To start your journey, you can look at the articles that are already
          published (on IPFS oc!) on the right panel.
        </p>

        <div className="flex justify-end text-2xl">
          <div className="animate-pulse">
            <FaArrowRight />
          </div>
        </div>
      </Card>
    </>
  );
};

EmptyArticle.defaultProps = {};

export default EmptyArticle;
