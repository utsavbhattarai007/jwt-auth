import { useRoutes } from "react-router-dom";

//Layouts
import NavOnly from "./layout/NavOnly";

//Pages
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound  from "./pages/NotFound";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/app",
      element: <NavOnly />,
      children: [{ path: "", element: <Home /> }],
    },
    { path: "*", element: <NotFound/> },
  ]);
}
