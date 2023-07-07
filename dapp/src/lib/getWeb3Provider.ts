import { ethers } from "ethers";
import { environment } from "./constants";

export const getWeb3Provider = () => {
  // const network: Networkish = match(environment.NODE_ENV)
  //   .with("development", always("http://localhost:8545"))
  //   .with("production", always(environment.NETWORK))
  //   .otherwise(always("http://localhost:8545"));

  return ethers.getDefaultProvider(environment.NETWORK);
};
