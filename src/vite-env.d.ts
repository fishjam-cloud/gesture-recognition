/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ROOM_MANAGER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
