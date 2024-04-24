import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useAxios from "../services/useAxios";

interface PerfisContextValue {
  perfis: Perfis.PerfilType[];
  getPerfis: () => void;
}

const PerfisContext = createContext<PerfisContextValue | null>(null);
export default PerfisContext;

/**
 * Contexto de busca e listagem de perfis do sistema
 */
export const PerfisProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [perfis, setPerfis] = useState<Perfis.PerfilType[]>([]);
  const { makeRequest } = useAxios();

  const getPerfis = useCallback(async () => {
    const response = await makeRequest({
      url: "/perfis",
    });

    if (response.success) {
      setPerfis(response.perfis as Perfis.PerfilType[]);
    }
  }, [makeRequest]);

  return (
    <PerfisContext.Provider
      value={{
        perfis,
        getPerfis,
      }}
    >
      {children}
    </PerfisContext.Provider>
  );
};

export const usePerfis = () => {
  const context = useContext(PerfisContext);

  if (!context) {
    throw new Error("usePerfis must be used within an PerfisProvider");
  }

  return context;
};
