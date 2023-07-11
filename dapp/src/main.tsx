import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import IpfsProvider from "./contexts/IpfsProvider.tsx";
import ArticleProvider from "./contexts/ArticleProvider.tsx";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { isNilOrEmpty } from "ramda-adjunct";
import { reject } from "ramda";
import { publicProvider } from "wagmi/providers/public";
import { ClientContextProvider } from "./contexts/ClientContext.tsx";
import { BlogProvider } from "./contexts/BlogProvider.tsx";

const App = React.lazy(() => import("./App.tsx"));

// const chains = [polygon, sepolia, localhost];
export const chains = reject(isNilOrEmpty)([
  // localhost,
  import.meta.env.PROD ? polygon : sepolia,
]);

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
  alchemyProvider({ apiKey: alchemyApiKey }),
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <ClientContextProvider>
        <BlogProvider>
          <IpfsProvider>
            <ArticleProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
              <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
              />
            </ArticleProvider>
          </IpfsProvider>
        </BlogProvider>
      </ClientContextProvider>
    </WagmiConfig>
  </React.StrictMode>
);
