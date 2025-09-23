declare interface Window {
  APP_ID?: string;
  BASE_PATH?: string;
  APP_CONFIG: any;
}

interface ImportMetaEnv {
  readonly BE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
