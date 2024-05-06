import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import {
  appBarMinHeight,
  drawerWidthClosed,
  drawerWidthOpen,
  isIOS,
} from "../constants";
import { useMuiTheme } from "../contexts/MuiThemeContext";
import StyledIconButton from "./StyledIconButton";
import Typography from "@mui/material/Typography";

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  width: drawerWidthOpen,
  "& .MuiListItemText-root": {
    textWrap: "wrap",
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: drawerWidthClosed,
  "& .MuiListItemText-root, & .MenuDrawerItemChildren": {
    display: "none",
  },
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
  "& .MuiListItemButton-root": {
    minHeight: "48px",
  },
}));

interface DrawerProps {
  anchor: "left" | "right";
  open: boolean;
  toggleDrawer: () => void;
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
  children,
  anchor,
}) => {
  const flexDirection = anchor === "left" ? "row" : "row-reverse";
  const ChevronIcon =
    anchor === "left" && open ? ChevronLeftIcon : ChevronRightIcon;

  const { temaAtivo } = useMuiTheme();

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
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection,
          minHeight: appBarMinHeight + " !important",
          maxHeight: appBarMinHeight + " !important",
        })}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {title && open && (
            <Typography
              sx={(theme) => ({
                fontSize: 18,
                textWrap: "wrap",
                overflowX: "hidden",
                maxWidth: "120px",
              })}
            >
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
