import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import Box from "@mui/material/Box";
import { appBarMinHeight } from "../../constants";
import { useMuiTheme } from "../../contexts/MuiThemeContext";
import Grid from "@mui/material/Grid";
import StyledIconButton from "../../components/StyledIconButton";
import { DarkMode, LightMode } from "@mui/icons-material";

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar)<StyledAppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundImage: "none",
  boxShadow: "none",
  padding: "8px 0",
  minHeight: appBarMinHeight,
}));

interface AppBarProps {}

const AppHeader: React.FunctionComponent<AppBarProps> = () => {
  const { getUrlLogo, temaAtivo, toggleMode } = useMuiTheme();
  const urlLogo = getUrlLogo("header");
  return (
    <StyledAppBar position="absolute">
      <Toolbar>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={1}></Grid>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            item
            xs={10}
          >
            {!!urlLogo && (
              <Box sx={{ width: { xs: "200px", md: "300px" }, height: "100%" }}>
                <img
                  src={urlLogo}
                  alt="logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={1} sx={{ textAlign: "right" }}>
            {!!temaAtivo && (
              <StyledIconButton onClick={toggleMode}>
                {temaAtivo.mui_mode === "light" ? <LightMode /> : <DarkMode />}
              </StyledIconButton>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppHeader;
