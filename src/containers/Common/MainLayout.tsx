import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useMuiTheme } from "../../contexts/MuiThemeContext";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Layout padrão para usuários autenticados na aplicação
 */
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { getUrlFavicon } = useMuiTheme();

  /** Atualiza o favicon usando o tema ativo */
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = getUrlFavicon();
  }, []);

  if (!isAuthenticated) {
    return children;
  }
  return <div>{children}</div>;
};

export default MainLayout;
