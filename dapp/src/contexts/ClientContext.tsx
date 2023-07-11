import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { EthereumProvider } from "@walletconnect/ethereum-provider";
import Client from "@walletconnect/sign-client";

import * as providers from "ethers/providers";
import { environment } from "../lib/constants";
import { chains } from "../main";
import { head, isNotNil } from "ramda";

/**
 * Types
 */
interface IContext {
  web3Provider?: providers.Provider;
}

/**
 * Context
 */
export const ClientContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function ClientContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [web3Provider, setWeb3Provider] = useState<
    providers.Provider | providers.AbstractProvider
  >();

  useEffect(() => {
    const { ethereum } = window as { ethereum?: providers.Eip1193Provider };

    if (isNotNil(ethereum)) {
      const provider = new providers.BrowserProvider(ethereum);
      setWeb3Provider(provider);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const provider = providers.getDefaultProvider(
        environment.NETWORK as providers.Networkish
      );

      setWeb3Provider(provider);
    }
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
