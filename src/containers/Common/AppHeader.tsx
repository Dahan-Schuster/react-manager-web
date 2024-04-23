import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import Box from "@mui/material/Box";
import { appBarMinHeight } from "../../constants";
import { useMuiTheme } from "../../contexts/MuiThemeContext";

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar)<StyledAppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  padding: "8px 0",
  minHeight: appBarMinHeight,
}));

interface AppBarProps {}

const AppHeader: React.FunctionComponent<AppBarProps> = () => {
  const { getUrlLogo } = useMuiTheme();
  const urlLogo = getUrlLogo("header");
  return (
    <StyledAppBar position="absolute">
      <Toolbar>
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
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppHeader;
