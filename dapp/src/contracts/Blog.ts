import { ethers } from "ethers";

import { abi } from "./abi/Blog.json";
import { InterfaceAbi } from "ethers";
import { getWeb3Provider } from "../lib/getWeb3Provider";
import { isNotNilOrEmpty } from "ramda-adjunct";

export type Post = {
  title: string;
  ipfsUrl: string;
  timestamp: number;
};

export class BlogContract {
  private contract: ethers.Contract;
  public readonly address: string;
  public readonly abi: InterfaceAbi = abi as InterfaceAbi;
  protected owner: string | null = null;

  constructor(contractAddress: string) {
    this.abi = abi as InterfaceAbi;
    this.contract = new ethers.Contract(
      contractAddress,
      abi as InterfaceAbi,
      getWeb3Provider()
    );

    this.address = contractAddress;
  }

  async getOwner(): Promise<string> {
    if (isNotNilOrEmpty(this.owner)) {
      return Promise.resolve(this.owner!);
    }

    return this.contract.owner().then((result: string) => {
      this.owner = result;
      return result;
    });
  }

  async createPost(title: string, ipfsUrl: string): Promise<void> {
    return this.contract.createPost(title, ipfsUrl).then((result) => {
      console.log("createPost", result);
    });
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
