import {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useCallback,
} from "react";
import config from "../config";
import MainLayout from "../containers/Common/MainLayout";

interface MainLayoutContextValue {
  layoutConfig: {
    title: string;
  };
  setLayoutConfig: (
    config: Partial<MainLayoutContextValue["layoutConfig"]>
  ) => void;
}

const MainLayoutContext = createContext<MainLayoutContextValue | null>(null);
export default MainLayoutContext;

/**
 * Contexto para alterar a configuração do layout principal
 * que engloba todas as rotas dentro da rota raiz
 */
export const MainLayoutProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [layoutConfig, setLayoutConfig] = useState<
    MainLayoutContextValue["layoutConfig"]
  >({
    title: "",
  });

  const handleSetLayoutConfig = useCallback(
    (layoutConfig: Partial<MainLayoutContextValue["layoutConfig"]>) => {
      setLayoutConfig((prev) => ({ ...prev, ...layoutConfig }));
    },
    []
  );

  return (
    <MainLayoutContext.Provider
      value={{
        layoutConfig,
        setLayoutConfig: handleSetLayoutConfig,
      }}
    >
      <MainLayout>{children}</MainLayout>
    </MainLayoutContext.Provider>
  );
};

export const useMainLayout = () => {
  const context = useContext(MainLayoutContext);

  if (!context) {
    throw new Error("useMainLayout must be used within an MainLayoutProvider");
  }

  return context;
};
