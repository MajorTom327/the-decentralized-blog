import { createContext, ReactNode, useMemo } from "react";

class Ipfs {
  mapping: Record<string, string> = {};

  getFile(cid: string) {
    if (this.mapping[cid]) {
      return Promise.resolve(this.mapping[cid]);
    }
    return fetch(`https://ipfs.io/ipfs/${cid}`)
      .then((res) => res.text())
      .then((text) => {
        this.mapping[cid] = text;
        return text;
      });
  }
}

export const IpfsContext = createContext<Ipfs>(new Ipfs());

export const IpfsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const ipfs = useMemo(() => new Ipfs(), []);

  return <IpfsContext.Provider value={ipfs}>{children}</IpfsContext.Provider>;
};

export default IpfsProvider;
