import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import { DarkMode, LightMode } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import StyledIconButton from "../../components/StyledIconButton";
import { appBarMinHeight } from "../../constants";
import { useMuiTheme } from "../../contexts/MuiThemeContext";

const StyledAppBar = styled(MuiAppBar)<AppBarProps>(() => ({
  backgroundImage: "none",
  boxShadow: "none",
  padding: "8px 0",
  minHeight: appBarMinHeight,
  maxHeight: appBarMinHeight,
}));

interface AppBarProps {}

const AppHeader: React.FunctionComponent<AppBarProps> = () => {
  const { getUrlLogo, temaAtivo, toggleMode } = useMuiTheme();
  const urlLogo = getUrlLogo("header");
  return (
    <StyledAppBar
      position="absolute"
    >
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
              <Box sx={{ width: { xs: "200px", md: "200px" }, height: "100%" }}>
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
              <Tooltip
                title={`Alterar para tema ${
                  temaAtivo.mui_mode === "dark" ? "claro" : "escuro"
                }`}
              >
                <StyledIconButton onClick={toggleMode}>
                  {temaAtivo.mui_mode === "dark" ? <LightMode /> : <DarkMode />}
                </StyledIconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppHeader;
