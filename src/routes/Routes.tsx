import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";

import Login from "@/pages/Login";
import Company from "@/pages/Admin/company/Company";
import LoadBoard from "@/pages/Admin/load/LoadBoard";
import Drivers from "@/pages/Admin/driver/Drivers";
import Message from "@/pages/Admin/message/Message";
import AdminLayout from "@/pages/Admin/AdminDashboard";
import AdminHome from "@/pages/Admin/AdminHome";
import LoadDetailsPage from "@/pages/Admin/load/LoadDetailsPage";
import CompanyDetailsPage from "@/pages/Admin/company/CompanyDetailsPage";
import Users from "@/pages/Admin/user/Users";
import DriversDetailsPage from "@/pages/Admin/driver/DriverDetailsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "company", element: <Company /> },
      { path: "company/:id", element: <CompanyDetailsPage /> },
      { path: "loads", element: <LoadBoard /> },
      { path: "loads/:id", element: <LoadDetailsPage /> },
      { path: "drivers", element: <Drivers /> },
      { path: "drivers/:id", element: <DriversDetailsPage /> },
      { path: "messages", element: <Message /> },
      { path: "users", element: <Users /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
