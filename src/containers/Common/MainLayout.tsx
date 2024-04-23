import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useMuiTheme } from "../../contexts/MuiThemeContext";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import usePageTitle from "../../hooks/usePageTitle";
import MenuDrawer from "./MenuDrawer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { appBarMinHeight } from "../../constants";
import { Breakpoint, SxProps } from "@mui/material/styles";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  hideTitle?: boolean;
  showBackButton?: boolean;
  mainContainerMaxWidth?: Breakpoint;
  mainContainerSx?: SxProps;
}

/**
 * Layout padrão para usuários autenticados na aplicação
 */
const MainLayout: FC<MainLayoutProps> = ({
  children,
  title = "",
  hideTitle = false,
  showBackButton = true,
  mainContainerMaxWidth = "lg",
  mainContainerSx = {},
}) => {
  const { isAuthenticated } = useAuth();
  const { getUrlFavicon } = useMuiTheme();

  usePageTitle(title);

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

  const navigate = useNavigate();

  if (!isAuthenticated) {
    return children;
  }

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppHeader />
      <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: `calc(100vh - ${appBarMinHeight})`,
          overflow: "auto",
          marginTop: appBarMinHeight,
        }}
      >
        <Container
          maxWidth={mainContainerMaxWidth}
          sx={{
            pt: 2,
            pb: 2,
            minHeight: "90%",
            display: "flex",
            flexDirection: "column",
            ...mainContainerSx,
          }}
        >
          <Box mb={hideTitle && !showBackButton ? 0 : 2}>
            <Grid container spacing={2} justifyContent={"space-between"}>
              {!hideTitle && (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  order={{ xs: 2, sm: 1 }}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <h2>{title}</h2>
                </Grid>
              )}
              {showBackButton && (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  order={{ xs: 1, sm: 2 }}
                  display="flex"
                  justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                >
                  <Button
                    sx={{ fontSize: 18, padding: 0 }}
                    onClick={() => {
                      navigate(-1);
                    }}
                    color="inherit"
                    startIcon={<ArrowLeft />}
                  >
                    Voltar
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>

          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
