import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { Breakpoint, SxProps } from "@mui/material/styles";
import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import { appBarMinHeight, drawerWidthClosed } from "../../constants";
import usePageTitle from "../../hooks/usePageTitle";
import AppHeader from "./AppHeader";
import MenuDrawer from "./MenuDrawer";
import RouterBreadcrumbs from "./RouterBreadcrumbs";
import Grid from "@mui/material/Grid";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  hideTitle?: boolean;
  mainContainerMaxWidth?: Breakpoint;
  mainContainerSx?: SxProps;
  paperSx?: SxProps;
  options?: ReactNode[];
}

/**
 * Layout padrão para usuários autenticados na aplicação
 */
const MainLayout: FC<MainLayoutProps> = ({
  children,
  title = "",
  hideTitle = true,
  mainContainerMaxWidth = "lg",
  mainContainerSx = {},
  paperSx = {},
  options = [],
}) => {
  usePageTitle(title);

  /* Estado para o menu lateral */
  const [drawerOpen, setDrawerOpen] = useState(false);

  /** Método para alterar o estado do menu lateral */
  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

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
          paddingLeft: drawerWidthClosed,
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <RouterBreadcrumbs />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              display="inline-flex"
              justifyContent="flex-end"
              flexWrap="wrap"
              gap={1}
            >
              {options.map((option, index) => (
                <Fragment key={index}>{option}</Fragment>
              ))}
            </Grid>
          </Grid>

          <Box mb={2}>{!hideTitle && <h2>{title}</h2>}</Box>

          <Paper sx={{ p: 2, ...paperSx }}>{children}</Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
