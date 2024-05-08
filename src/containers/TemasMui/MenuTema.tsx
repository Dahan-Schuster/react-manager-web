import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState } from "react";
import StyledDrawer from "../../components/StyledDrawer";
import StyledIconButton from "../../components/StyledIconButton";
import { appBarMinHeight, drawerWidthOpen, isIOS } from "../../constants";
import Divider from "@mui/material/Divider";
import MenuDrawerItem from "../Common/MenuDrawerItem";

interface MenuTemaProps {
  tema: Mui.Theme;
}

/**
 * Drawer de previsualização do menu do tema em edição
 */
const MenuTema: FC<MenuTemaProps> = ({ tema }) => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const toggleDrawer = useCallback(() => {
    setOpenDrawer((open) => !open);
  }, []);

  const ChevronIcon = openDrawer ? ChevronLeft : ChevronRight;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="start"
      height="100%"
    >
      <Typography variant="h6" color="text.secodary">
        Menu
      </Typography>
      <StyledDrawer
        anchor={"left"}
        open={openDrawer}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
        variant="permanent"
        sx={(theme) => ({
          flex: 1,
          "& .MuiDrawer-paper": {
            backgroundColor: tema?.cor_menu || theme.palette.background.paper,
            position: "relative",
          },

          "& .MuiListItemText-root": {
            color: tema?.cor_texto_menu || theme.palette.text.primary,
          },
        })}
      >
        <Toolbar
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: appBarMinHeight + " !important",
            maxHeight: appBarMinHeight + " !important",
            backgroundColor: tema?.cor_header || theme.palette.primary.main,
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {openDrawer && (
              <Typography
                sx={(theme) => ({
                  fontSize: 18,
                  color:
                    tema?.cor_texto_header ||
                    theme.palette.primary.contrastText,
                  textWrap: "wrap",
                  overflowX: "hidden",
                  maxWidth: "120px",
                })}
              >
                Olá, mundo!
              </Typography>
            )}
          </Box>
          <StyledIconButton onClick={() => toggleDrawer()}>
            <ChevronIcon />
          </StyledIconButton>
        </Toolbar>
        <List
          component="nav"
          sx={{
            display: "flex",
            flexDirection: "column",
            top: 0,
            height: "100%",
            overflowX: "hidden",
            width: drawerWidthOpen,
          }}
        >
          {itensExemplo.map((i) => (
            <MenuDrawerItem key={i.id} item={i} />
          ))}
          <Box mt={"auto"}>
            <Divider />
            <MenuDrawerItem
              item={{
                id: 0,
                label: "Logout",
                url: "#",
                icone: "logout",
                target: "_self",
                parent_id: null,
              }}
            />
          </Box>
        </List>
      </StyledDrawer>
    </Box>
  );
};

const itensExemplo = [
  {
    id: 1,
    icone: "home",
    label: "Página inicial",
    url: "#",
    target: "_self",
    parent_id: null,
  },
  {
    id: 2,
    icone: "people",
    label: "Usuários",
    url: "#",
    target: "_self",
    parent_id: null,
    children: [
      {
        id: 3,
        icone: "group_add",
        label: "Cadastrar",
        url: "#",
        target: "_self",
        parent_id: 2,
      },
    ],
  },
  {
    id: 4,
    icone: "open_in_new",
    label: "Link externo",
    url: "https://www.google.com.br/",
    target: "_blank",
    parent_id: null,
  },
] as Sistema.MenuItemType[];

export default MenuTema;
