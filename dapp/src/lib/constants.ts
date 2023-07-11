export const environment = {
  NODE_ENV: import.meta.env.PROD ? "production" : "development",
  NETWORK: import.meta.env.VITE_NETWORK,
  CHAIN_ID: import.meta.env.VITE_CHAIN_ID,
  WC_PROJECT_ID: import.meta.env.VITE_WC_PROJECT_ID,
  ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY,
  CONTRACTS: {
    BLOG:
      import.meta.env.VITE_CONTRACTS_BLOG ||
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
};

export default {
  environment,
};
