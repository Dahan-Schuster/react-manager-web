import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import RootPage from "../pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        async lazy() {
          let { default: Index } = await import("../pages/Auth/Login");
          return { Component: Index };
        },
      },
      {
        path: "logout",
        async lazy() {
          let { default: Index } = await import("../pages/Auth/Logout");
          return { Component: Index };
        },
      },
      {
        path: "esqueci-minha-senha",
        async lazy() {
          let { default: Index } = await import("../pages/Auth/EsqueciSenha");
          return { Component: Index };
        },
      },
      {
        path: "alterar-senha/:token",
        async lazy() {
          let { default: Index } = await import("../pages/Auth/NovaSenha");
          return { Component: Index };
        },
      },
      {
        path: "/",
        async lazy() {
          let { default: Index } = await import("../pages/InitialPage");
          return { Component: Index };
        },
      },
      {
        path: "/usuarios",
        async lazy() {
          let { default: Index } = await import("../pages/Users");
          return { Component: Index };
        },
      },
      {
        path: "/perfis",
        async lazy() {
          let { default: Index } = await import("../pages/Perfis");
          return { Component: Index };
        },
      },
      {
        path: "/temas",
        async lazy() {
          let { default: Index } = await import("../pages/Temas");
          return { Component: Index };
        },
      },
    ],
  },
]);

export default router;
