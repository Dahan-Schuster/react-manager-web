import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import { drawerWidthClosed, drawerWidthOpen, isIOS } from "../constants";
import StyledIconButton from "./StyledIconButton";
import { useMuiTheme } from "../contexts/MuiThemeContext";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidthOpen,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: drawerWidthClosed,
});

const StyledDrawer = styled(MuiSwipeableDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.background.paper
        : theme.palette.background.default,
    borderRight:
      theme.palette.mode === "light"
        ? "none"
        : `1px solid ${theme.palette.background.paper}`,

    "& a": {
      textDecoration: "none",
    },
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  },
}));

interface DrawerProps {
  anchor: "left" | "right";
  open: boolean;
  toggleDrawer: () => void;
  showLogo?: boolean;
  children: React.ReactNode;
  title?: string;
}

/**
 * Menu Lateral padrão da aplicação
 */
const Drawer: React.FunctionComponent<DrawerProps> = ({
  open,
  title,
  toggleDrawer,
  showLogo,
  children,
  anchor,
}) => {
  const flexDirection = anchor === "left" ? "row" : "row-reverse";
  const ChevronIcon =
    anchor === "left" && open ? ChevronLeftIcon : ChevronRightIcon;

  const { getUrlLogo } = useMuiTheme();
  const urlLogo = getUrlLogo("header");

  return (
    <StyledDrawer
      anchor={anchor}
      open={open}
      onClose={() => toggleDrawer()}
      onOpen={() => toggleDrawer()}
      disableBackdropTransition={!isIOS}
      disableDiscovery={isIOS}
      variant="permanent"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: [1],
          py: 2,
          flexDirection,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {showLogo && !!urlLogo && open && (
            <Box sx={{ width: { xs: "150px", md: "200px" }, height: "100%" }}>
              <img
                src={urlLogo}
                alt="logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          )}
          {title && open && (
            <Typography fontSize={22} fontWeight="bold">
              {title}
            </Typography>
          )}
        </Box>
        <StyledIconButton onClick={() => toggleDrawer()}>
          <ChevronIcon />
        </StyledIconButton>
      </Toolbar>
      {children}
    </StyledDrawer>
  );
};

export default Drawer;
