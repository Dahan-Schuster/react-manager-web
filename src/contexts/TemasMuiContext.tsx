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
  ativarTema: (tema: Mui.Theme) => Promise<Common.CommonResponse>;
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

  const ativarTema = useCallback(
    async (tema: Mui.Theme) => {
      const response = await makeRequest({
        url: `/sistema/temas-mui/${tema.id}/ativar`,
        method: "put",
      });

      return response;
    },
    [makeRequest]
  );

  return (
    <TemasMuiContext.Provider
      value={{
        temas,
        setTemas,
        getTemas,
        ativarTema,
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
