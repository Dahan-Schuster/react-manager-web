import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../contexts/AuthContext";
import { MuiThemeProvider } from "../contexts/MuiThemeContext";
import { PerfisProvider } from "../contexts/PerfisContext";
import { TemasMuiProvider } from "../contexts/TemasMuiContext";
import { UsersProvider } from "../contexts/UsersContext";
import { dayjsSetup } from "../utility/dayjs.helper";

/**
 * Página raiz que engloba o restante das páginas
 */
const RootPage: FC = () => {
  dayjsSetup();

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
          limit={3}
        />

        <PerfisProvider>
          <UsersProvider>
            <TemasMuiProvider>
              <Outlet />
            </TemasMuiProvider>
          </UsersProvider>
        </PerfisProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default RootPage;
