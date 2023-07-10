import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import IpfsProvider from "./contexts/IpfsProvider.tsx";
import ArticleProvider from "./contexts/ArticleProvider.tsx";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { localhost, polygon } from "wagmi/chains";

// const chains = [polygon, sepolia, localhost];
const chains = [localhost];
const projectId = import.meta.env.VITE_WC_PROJECT_ID;

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <IpfsProvider>
        <ArticleProvider>
          <App />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </ArticleProvider>
      </IpfsProvider>
    </WagmiConfig>
  </React.StrictMode>
);
