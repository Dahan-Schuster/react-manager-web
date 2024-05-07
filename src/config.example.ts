import { storageBaseName } from "./constants";

const config = {
  appTitle: "Projeto Padrão",
  apiBaseUrl: "http://localhost:3333",
  apiTimeout: 1000 * 60, // 1 min
  storageKeys: {
    user: `${storageBaseName}:user`,
    temaAtivo: `${storageBaseName}:temaAtivo`,
  },
};

export default config;
