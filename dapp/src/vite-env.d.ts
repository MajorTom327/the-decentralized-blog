/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK: string;
  readonly VITE_CONTRACTS_BLOG: string;
  readonly VITE_WC_PROJECT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
