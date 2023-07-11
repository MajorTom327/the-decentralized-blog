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
  const [web3Provider, setWeb3Provider] = useState<providers.Provider>();
  const [client, setClient] = useState<Client>();
  const [ethereumProvider, setEthereumProvider] =
    useState<Awaited<ReturnType<typeof EthereumProvider.init>>>();

  const createClient = useCallback(async () => {
    // @ts-expect-error ignore this
    const provider = await EthereumProvider.init({
      projectId: environment.WC_PROJECT_ID,
      chains: chains.map((chain): number => chain.id),
      optionalChains: chains.map((chain): number => chain.id),
      showQrModal: false,
    });

    setEthereumProvider(provider);
  }, []);

  const createWeb3Provider = useCallback(
    (ethereumProvider: UniversalProvider) => {
      const web3Provider = new providers.BrowserProvider(
        ethereumProvider,
        environment.NETWORK
      );
      setWeb3Provider(web3Provider);
    },
    []
  );

  const connect = useCallback(async () => {
    if (!ethereumProvider) {
      throw new ReferenceError("WalletConnect Client is not initialized.");
    }

    const _accounts = await ethereumProvider.enable();

    console.log("accounts", { _accounts });
  }, [ethereumProvider, createWeb3Provider]);

  useEffect(() => {
    if (!client) {
      void createClient();
    }
  }, [client, createClient]);

  useEffect(() => {
    if (!web3Provider) {
      void connect();
    }
  }, [client, connect, web3Provider]);

  const value = useMemo(
    () => ({
      connect,
      web3Provider: ethereumProvider,
    }),
    [connect, web3Provider]
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
