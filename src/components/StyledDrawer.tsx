import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import { drawerWidthOpen, drawerWidthClosed } from "../constants";

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
    border: "none",
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

export default StyledDrawer;
