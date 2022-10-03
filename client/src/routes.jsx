import { useRoutes } from "react-router-dom";

//Layouts
import NavWithFooter from "./layout/NavWithFooter";

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
      element: <NavWithFooter />,
      children: [{ path: "", element: <Home /> }],
    },
    { path: "*", element: <NotFound /> },
  ]);
}
