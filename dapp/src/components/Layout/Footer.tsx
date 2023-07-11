import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import Button from "../Button/Button";
import { DateTime } from "luxon";
import { isNotNil, uniq } from "ramda";
import { useBlog } from "../../contexts/BlogProvider";
import { environment } from "../../lib/constants";

export const AsOwner: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ipfs, setIpfs] = useState("");
  const blog = useBlog();

  const { config } = usePrepareContractWrite({
    // @ts-expect-error I don't care at this point.
    address: environment.CONTRACTS.BLOG,
    // @ts-expect-error I don't care at this point.
    abi: blog?.abi,
    functionName: "createPost",
    args: [title, ipfs],
  });

  const { writeAsync } = useContractWrite(config);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (writeAsync) void writeAsync();
  };

  return (
    <footer>
      <div className="flex w-full justify-center p-2 bg-primary text-primary-content rounded">
        <form className="flex w-full gap-2" onSubmit={submitHandle}>
          <input
            className="p-2 rounded w-full text-base-100-content"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="p-2 rounded w-full text-base-100-content"
            name="ipfs"
            placeholder="CID"
            value={ipfs}
            onChange={(e) => setIpfs(e.target.value)}
          />
          <Button className="bg-info text-info-content" type="submit">
            Send new Article
          </Button>
        </form>
      </div>
    </footer>
  );
};

export const Footer: React.FC = () => {
  const { address } = useAccount();
  const [owner, setOwner] = useState<string | null>(null);
  const blog = useBlog();

  useEffect(() => {
    if (!blog) return;

    void blog.getOwner().then((owner) => {
      setOwner(owner);
    });
  }, [blog]);

  if (isNotNil(address) && address === owner) {
    return <AsOwner />;
  }

  const footerDate = uniq([2023, DateTime.local().year]).join(" - ");

  return (
    <>
      <footer>
        <div className="flex flex-col gap-2 items-center w-full justify-center p-2 bg-primary text-primary-content rounded text-center">
          <h1 className="text-xl ">
            A decentralized blog built by majortom327.eth
          </h1>
          <h2>{footerDate} © </h2>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
