import { createBrowserRouter } from "react-router-dom";
import RootPage from "../pages/Root";
import Login from "../pages/Auth/Login";
import EsqueciSenha from "../pages/Auth/EsqueciSenha";
import Logout from "../pages/Auth/Logout";
import NovaSenha from "../pages/Auth/NovaSenha";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
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
    ],
  },
]);

export default router;
