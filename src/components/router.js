import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import Layout from "./Layout/Layout";
import Login from "./login/login";
import Profile from "./Profile/profile";
import ChangePassword from "./Profile/changePassword";
import Usermanagement from "./UserManagement/user_management"
import UserManagement from "./UserManagement/user_management";


export const routers = createBrowserRouter([
    {
        path: "/",
        exact: true,
        element: <Layout />,
        children: [
            {
                path: "dashboard",
                exact: true,
                element: < Dashboard />,
            },
            {
                path: "/",
                exact: true,
                element: < Dashboard />,
            },
            {
                path: "/profile",
                exact: true,
                element: < Profile />,
            },
            {
                path: "/change_password",
                exact: true,
                element: < ChangePassword />,
            },
            {
                path: "/user",
                exact: true,
                element: < UserManagement />,
            },
        ],
    },
    {
        path: "/login",
        exact: true,
        element: <Login />,
    },
]);

