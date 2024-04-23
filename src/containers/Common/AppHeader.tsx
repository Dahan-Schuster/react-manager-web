import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";

import StyledIconButton from "../../components/StyledIconButton";
import config from "../../config";
import Box from "@mui/material/Box";
import { useMuiTheme } from "../../contexts/MuiThemeContext";

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar)<StyledAppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  padding: "8px 0",
  minHeight: config.appBarMinHeight,
}));

interface AppBarProps {
  toggleDrawer: () => void;
}

const AppHeader: React.FunctionComponent<AppBarProps> = ({ toggleDrawer }) => {
  const { getUrlLogo } = useMuiTheme();
  const urlLogo = getUrlLogo("header");
  return (
    <StyledAppBar position="absolute">
      <Toolbar>
        <StyledIconButton
          edge="start"
          aria-label="open drawer"
          onClick={() => toggleDrawer()}
          sx={{
            marginLeft: 1,
          }}
        >
          <MenuIcon />
        </StyledIconButton>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex="1"
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
        </Box>
        {/* Espaço equivalente ao ícone da esquerda, para manter a logo centralizada */}
        <Box height={40} width={40} />
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppHeader;
