import { createBrowserRouter } from "react-router-dom";
import RootPage from "../pages/Root";
import Login from "../pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
