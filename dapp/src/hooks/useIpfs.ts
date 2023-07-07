import { useContext } from "react";
import { IpfsContext } from "../contexts/IpfsProvider";

export const useIpfs = () => {
  const ctx = useContext(IpfsContext);

  return ctx;
};

export default useIpfs;
