import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useMuiTheme } from "../../contexts/MuiThemeContext";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import { useMainLayout } from "../../contexts/MainLayoutContext";
import usePageTitle from "../../hooks/usePageTitle";
import MenuDrawer from "./MenuDrawer";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Layout padrão para usuários autenticados na aplicação
 */
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { getUrlFavicon } = useMuiTheme();

  const { layoutConfig } = useMainLayout();
  usePageTitle(layoutConfig.title);

  /* Estado para o menu lateral */
  const [drawerOpen, setDrawerOpen] = useState(false);

  /** Método para alterar o estado do menu lateral */
  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  /** Atualiza o favicon usando o tema ativo */
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      link.type = "image/x-icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = getUrlFavicon();
  }, []);

  if (!isAuthenticated) {
    return children;
  }
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppHeader />
      <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      {children}
    </Box>
  );
};

export default MainLayout;
