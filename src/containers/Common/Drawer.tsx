import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StyledDrawer from "../../components/StyledDrawer";
import StyledIconButton from "../../components/StyledIconButton";
import { appBarMinHeight, isIOS } from "../../constants";
import { useMuiTheme } from "../../contexts/MuiThemeContext";

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
      sx={(theme) => ({
        "& .MuiDrawer-paper": {
          backgroundColor:
            temaAtivo?.cor_menu || theme.palette.background.paper,
        },

        "& .MuiListItemText-root": {
          color: temaAtivo?.cor_texto_menu || theme.palette.text.primary,
        },
      })}
    >
      <Toolbar
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection,
          minHeight: appBarMinHeight + " !important",
          maxHeight: appBarMinHeight + " !important",
          backgroundColor: temaAtivo?.cor_header || theme.palette.primary.main,
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
                color:
                  temaAtivo?.cor_texto_header ||
                  theme.palette.primary.contrastText,
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
