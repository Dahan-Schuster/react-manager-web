import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import config from "../../config";
import { useLocation, Link as RouterLink } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/usuarios": "Usuários",
};

export default function RouterBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
        to="/"
        sx={{ display: "flex", alignItems: "center" }}
        component={RouterLink as any}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {config.appTitle}
      </Link>
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            to={to}
            key={to}
            component={RouterLink as any}
          >
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
