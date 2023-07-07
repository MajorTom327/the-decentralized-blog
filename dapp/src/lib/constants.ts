export const environment = {
  NODE_ENV: import.meta.env.PROD ? "production" : "development",
  NETWORK: import.meta.env.VITE_NETWORK,
  CONTRACTS: {
    BLOG:
      import.meta.env.VITE_CONTRACTS_BLOG ||
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
};

console.log("environment", import.meta, environment);

export default {
  environment,
};
