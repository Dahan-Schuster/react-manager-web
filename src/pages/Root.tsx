import { FC } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { MuiThemeProvider } from "../contexts/MuiThemeContext";

/**
 * Página raiz que engloba o restante das páginas
 */
const RootPage: FC = () => {
  return (
    <MuiThemeProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default RootPage;
