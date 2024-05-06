import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "../containers/Auth/RequireAuth";
import EsqueciSenha from "../pages/Auth/EsqueciSenha";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import NovaSenha from "../pages/Auth/NovaSenha";
import InitialPage from "../pages/InitialPage";
import RootPage from "../pages/Root";
import Users from "../pages/Users";
import ErrorPage from "../pages/ErrorPage";
import Perfis from "../pages/Perfis";
import TemasPage from "../pages/Temas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "esqueci-minha-senha",
        element: <EsqueciSenha />,
      },
      {
        path: "alterar-senha/:token",
        element: <NovaSenha />,
      },
      {
        path: "/",
        element: (
          <RequireAuth>
            <InitialPage />
          </RequireAuth>
        ),
      },
      {
        path: "/usuarios",
        element: (
          <RequireAuth>
            <Users />
          </RequireAuth>
        ),
      },
      {
        path: "/perfis",
        element: (
          <RequireAuth>
            <Perfis />
          </RequireAuth>
        ),
      },
      {
        path: "/temas",
        element: (
          <RequireAuth>
            <TemasPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;
