import { FC } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { MuiThemeProvider } from "../contexts/MuiThemeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainLayoutProvider } from "../contexts/MainLayoutContext";

/**
 * Página raiz que engloba o restante das páginas
 */
const RootPage: FC = () => {
  return (
    <MuiThemeProvider>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          stacked
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <MainLayoutProvider>
          <Outlet />
        </MainLayoutProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default RootPage;
