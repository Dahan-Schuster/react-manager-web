import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import { useAuth } from "../../contexts/AuthContext";
import MenuDrawerItem from "./MenuDrawerItem";
import { drawerWidthOpen } from "../../constants";
import Drawer from "./Drawer";

const bottomItems: Sistema.MenuItemType[] = [
  {
    id: 0,
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
        {user?.itensMenu?.map((i) => (
          <MenuDrawerItem key={i.id} item={i} />
        ))}
        {bottomItems && (
          <Box mt={"auto"}>
            <Divider />
            {bottomItems.map((i) => (
              <MenuDrawerItem key={i.id} item={i} />
            ))}
          </Box>
        )}
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
