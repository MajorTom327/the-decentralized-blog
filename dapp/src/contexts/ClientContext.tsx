import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import * as providers from "ethers/providers";
import { environment } from "../lib/constants";
import { has, isNotNil } from "ramda";

interface IContext {
  web3Provider?: providers.Provider;
}

export const ClientContext = createContext<IContext>({} as IContext);

export function ClientContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [web3Provider, setWeb3Provider] = useState<
    providers.Provider | providers.AbstractProvider
  >();

  useEffect(() => {
    const connect = async () => {
      const { ethereum } = window as { ethereum?: providers.Eip1193Provider };

      try {
        if (isNotNil(ethereum)) {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                rpcUrls: ["https://rpc-mainnet.matic.network/"],
                chainName: "Matic Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        }
        console.log("You have switched to the right network");
      } catch (switchError: any) {
        // The network has not been added to MetaMask
        if (has("code", switchError) && switchError.code === 4902) {
          console.log("Please add the Polygon network to MetaMask");
        }
        console.log("Cannot switch to the network");
      }

      const provider = isNotNil(ethereum)
        ? new providers.BrowserProvider(ethereum)
        : providers.getDefaultProvider(
            environment.NETWORK as providers.Networkish
          );

      setWeb3Provider(provider);
    };

    void connect();
  }, []);

  const value = useMemo(
    () => ({
      // connect,
      web3Provider,
    }),
    [web3Provider]
  );

  if (!value.web3Provider) {
    return <div>Loading...</div>;
  }

  return (
    <ClientContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useWalletConnectClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(
      "useWalletConnectClient must be used within a ClientContextProvider"
    );
  }
  return context;
}
