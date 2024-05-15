import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import { useAuth } from "../../contexts/AuthContext";
import MenuDrawerItem from "./MenuDrawerItem";
import { drawerWidthOpen } from "../../constants";
import Drawer from "../Common/Drawer";
import { useMemo } from "react";

const fixedBottomItems: Sistema.MenuItemType[] = [
  {
    id: 0,
    ordem: 200,
    label: "Logout",
    url: "/logout",
    icone: "logout",
    target: "_self",
    parent_id: null,
  },
];

interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

/**
 * Menu Lateral padrão da aplicação
 */
const MenuDrawer: React.FunctionComponent<DrawerProps> = ({
  open,
  toggleDrawer,
}) => {
  const { user } = useAuth();

  const [middle, bottom] = useMemo<
    [Sistema.MenuItemType[], Sistema.MenuItemType[]]
  >(() => {
    const middle: Sistema.MenuItemType[] = [],
      bottom: Sistema.MenuItemType[] = [];
    user?.itensMenu?.forEach((i) => {
      if (i.ordem >= 100) {
        bottom.push(i);
      } else {
        middle.push(i);
      }
    });

    bottom.push(...fixedBottomItems);

    return [middle, bottom];
  }, [user?.itensMenu]);

  return (
    <Drawer
      anchor="left"
      open={open}
      toggleDrawer={toggleDrawer}
      title={user ? "Olá, " + user!.nome.split(" ")[0] + "!" : undefined}
    >
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
        {middle.map((i) => (
          <MenuDrawerItem key={i.id} item={i} />
        ))}
        {bottom.length && (
          <Box mt={"auto"}>
            <Divider />
            {bottom.map((i) => (
              <MenuDrawerItem key={i.id} item={i} />
            ))}
          </Box>
        )}
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
