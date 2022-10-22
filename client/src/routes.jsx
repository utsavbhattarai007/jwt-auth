import {useRoutes } from "react-router-dom";

//Layouts
import NavWithFooter from "./layout/NavWithFooter";

//Pages
import Auth from "./pages/Auth";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";
import NotFound  from "./pages/NotFound";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element:<Auth/>,
    },
    {
      path: "/app",
      element: <NavWithFooter />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path:"/user/:id/verify/:token",
      element:<EmailVerify/>,
    },
    { path: "*", element: <NotFound /> },
  ]);
}
