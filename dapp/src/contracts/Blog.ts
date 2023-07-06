import ethers from "ethers";

import { abi } from "./abi/Blog.json";
import { InterfaceAbi } from "ethers";

type Post = {
  ipfsUrl: string;
  timestamp: number;
};

export class BlogContract {
  private contract: ethers.Contract;
  constructor(contractAddress: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      abi as InterfaceAbi,
      ethers.getDefaultProvider("http://localhost:8545")
    );
  }

  async getPostCount(): Promise<number> {
    return (await this.contract.getPostCount()) as Promise<number>;
  }

  async getPost(id: number): Promise<Post> {
    return (await this.contract.getPost(id)) as Promise<Post>;
  }
}
