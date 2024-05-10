import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import MUILink from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC, Fragment, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface MenuDrawerItemProps {
  item: Sistema.MenuItemType;
}

/**
 * Item do menu lateral do app
 */
const MenuDrawerItem: FC<MenuDrawerItemProps> = ({ item }) => {
  const { id, url, target, label, icone, children } = item;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <ListItem
        key={id}
        disablePadding
        sx={{ display: "flex", alignItems: "stretch" }}
      >
        <ListItemButton sx={{ cursor: "initial" }}>
          <MUILink
            component={url ? RouterLink : "div"}
            to={url!}
            target={target}
            title={label}
            underline={target === "_blank" ? "hover" : "none"}
            sx={{ flex: 1, display: "flex", alignItems: "center" }}
          >
            {!!icone && (
              <ListItemIcon
                sx={{
                  minWidth: "48px",
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                <Icon>{icone}</Icon>
              </ListItemIcon>
            )}
            <ListItemText
              primary={label}
              sx={{
                color: (theme) => theme.palette.text.primary,
              }}
            />
          </MUILink>
        </ListItemButton>
        {!!children?.length && (
          <ListItemIcon
            sx={{
              p: 1,
              minWidth: "24px",
              color: (theme) => theme.palette.primary.main,
              cursor: "pointer",
              alignItems: "center",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
            onClick={() => setOpen((open) => !open)}
          >
            <Icon>{open ? "keyboard_arrow_up" : "keyboard_arrow_down"}</Icon>
          </ListItemIcon>
        )}
      </ListItem>
      <Collapse in={open} className="MenuDrawerItemChildren" unmountOnExit>
        <Box pl={3}>
          {children?.map((item) => (
            <MenuDrawerItem key={item.id} item={item} />
          ))}
        </Box>
      </Collapse>
    </Fragment>
  );
};

export default MenuDrawerItem;
