import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { nomesRotas } from "../../constants";
import Icon from "@mui/material/Icon";
import type { SxProps } from "@mui/material/styles";

export default function RouterBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  pathnames.unshift("/");

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1;
        const currentRouteName = `/${_value}`.replace("//", "/");
        const to = `${pathnames.slice(0, index + 1).join("/")}`.replace(
          "//",
          "/"
        );

        const rotaConfig = nomesRotas[to] || {
          label: currentRouteName.replace("/", ""),
        };
        const children = (
          <>
            {!!rotaConfig.icon && (
              <Icon sx={{ mr: 0.5 }} fontSize="inherit">
                {rotaConfig.icon}
              </Icon>
            )}
            {rotaConfig.label}
          </>
        );

        const sx: SxProps = {
          display: "flex",
          alignItems: "center",
          textTransform: "capitalize",
        };

        return last || rotaConfig.disableLink ? (
          <Typography color="text.primary" key={currentRouteName} sx={sx}>
            {children}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            to={to}
            key={currentRouteName}
            component={RouterLink as any}
            sx={sx}
          >
            {children}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
