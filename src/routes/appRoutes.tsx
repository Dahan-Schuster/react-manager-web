import { createBrowserRouter } from "react-router-dom";
import RootPage from "../pages/Root";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";

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
    ],
  },
]);

export default router;
