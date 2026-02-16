/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONVAI_API_KEY: string;
  readonly VITE_CONVAI_CHARACTER_ID: string;
  readonly VITE_CONVAI_XPID: string;
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
