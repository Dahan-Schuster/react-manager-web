import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useAxios from "../services/useAxios";

interface TemasMuiContextValue {
  temas: Mui.Theme[];
  setTemas: Dispatch<SetStateAction<Mui.Theme[]>>;
  getTemas: () => Promise<void>;
}

const TemasMuiContext = createContext<TemasMuiContextValue | null>(null);
export default TemasMuiContext;

/**
 * Contexto para a tela de administração de temas MUI
 */
export const TemasMuiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [temas, setTemas] = useState<Mui.Theme[]>([]);
  const { makeRequest } = useAxios();

  const getTemas = useCallback(async () => {
    const response = await makeRequest({
      url: "/sistema/temas-mui",
    });

    if (response.success) {
      setTemas(response.temas as Mui.Theme[]);
    }
  }, [makeRequest]);

  return (
    <TemasMuiContext.Provider
      value={{
        temas,
        setTemas,
        getTemas,
      }}
    >
      {children}
    </TemasMuiContext.Provider>
  );
};

export const useTemasMui = () => {
  const context = useContext(TemasMuiContext);

  if (!context) {
    throw new Error("useTemasMui must be used within an TemasMuiProvider");
  }

  return context;
};
