import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import Drawer from "../../components/Drawer";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../contexts/AuthContext";
import ListItem from "@mui/material/ListItem";

const bottomItems: Common.DrawerItemType[] = [
  {
    label: "Logout",
    path: "/logout",
    Icon: <LogoutIcon />,
    iconColor: "#f44336",
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

  const renderItem = useCallback(
    ({ path, label, Icon, iconColor }: Common.DrawerItemType) => {
      return (
        <ListItem key={path} disablePadding sx={{ display: "block" }}>
          <Link to={path} onClick={() => toggleDrawer()} title={label}>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: "48px",
                  color: (theme) => iconColor || theme.palette.primary.main,
                }}
              >
                {Icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                sx={{ color: (theme) => theme.palette.text.primary }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      );
    },
    [toggleDrawer]
  );

  return (
    <Drawer anchor="left" open={open} toggleDrawer={toggleDrawer} showLogo>
      <List
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          top: 0,
          height: "100%",
        }}
      >
        {!!user && (
          <>
            {renderItem({
              label: "Olá, " + user!.nome.split(" ")[0] + "!",
              path: "#",
              Icon: <PersonIcon />,
            })}
            <Divider />
          </>
        )}
        {bottomItems && (
          <Box mt={"auto"}>
            <Divider />
            {bottomItems.map(renderItem)}
          </Box>
        )}
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
