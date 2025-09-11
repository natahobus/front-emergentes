/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Declare aqui as variáveis de ambiente que você usa no seu .env
  // Por exemplo:
  readonly VITE_API_URL: string
  // readonly MINHA_OUTRA_VARIAVEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}