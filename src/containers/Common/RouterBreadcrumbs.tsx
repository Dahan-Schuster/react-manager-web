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
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${_value}`.replace("//", "/");

        const nomeRota = nomesRotas[to] || { label: to.substring(1) };
        const children = (
          <>
            {!!nomeRota.icon && (
              <Icon sx={{ mr: 0.5 }} fontSize="inherit">
                {nomeRota.icon}
              </Icon>
            )}
            {nomeRota.label}
          </>
        );

        const sx: SxProps = {
          display: "flex",
          alignItems: "center",
          textTransform: "capitalize",
        };

        return last ? (
          <Typography color="text.primary" key={to} sx={sx}>
            {children}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            to={to}
            key={to}
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
