import { ethers } from "ethers";

import { abi } from "./abi/Blog.json";
import { InterfaceAbi } from "ethers";
import { getWeb3Provider } from "../lib/getWeb3Provider";

export type Post = {
  title: string;
  ipfsUrl: string;
  timestamp: number;
};

export class BlogContract {
  private contract: ethers.Contract;
  public readonly address: string;

  constructor(contractAddress: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      abi as InterfaceAbi,
      getWeb3Provider()
    );

    this.address = contractAddress;
  }

  async getPostCount(): Promise<number> {
    return this.contract.getPostsCount().then((result: number) => {
      console.log("getPostCount", result);
      return ethers.toNumber(result);
      // return result;
    });
  }

  async getPosts(): Promise<Post[]> {
    return this.contract
      .getAllPosts()
      .then((result: Array<[string, string, number]>) => {
        const posts = result.map(
          (post): Post => ({
            title: post[0],
            ipfsUrl: post[1],
            timestamp: ethers.toNumber(post[2]),
          })
        );

        return posts;
      });
  }

  async getPost(id: number): Promise<Post> {
    return (await this.contract.getPost(id)) as Promise<Post>;
  }
}

export default BlogContract;
