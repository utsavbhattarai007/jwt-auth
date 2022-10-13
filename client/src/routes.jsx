import { Navigate, useRoutes } from "react-router-dom";

//Layouts
import NavWithFooter from "./layout/NavWithFooter";

//Pages
import Auth from "./pages/Auth";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";
import NotFound  from "./pages/NotFound";

export default function Router() {
  const token = localStorage.getItem("access");
  return useRoutes([
    {
      path: "/",
      element:token ? <Navigate replace to="/app"/> : <Auth/>,
    },
    {
      path: "/app",
      element: token ? <NavWithFooter /> : <Navigate replace to="/" />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path:"/user/:id/verify/:token",
      element:<EmailVerify/>,
    },
    { path: "*", element: <NotFound /> },
  ]);
}
