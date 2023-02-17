import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import Layout from "./Layout/Layout";
import Login from "./login/login";
import Profile from "./Profile/profile";
import ChangePassword from "./Profile/changePassword";
import UserManagement from "./UserManagement/user_management";
import ForgotPassword from "./ForgotPassword/forgotPassword";
import UserEdit from "./UserManagement/userEdit";
import ViewOrders from "./UserManagement/view_orders";
import ViewProducts from "./UserManagement/view_products";
import Category from "./Category/Category";

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
            {
                path: "/user_edit/:id",
                exact: true,
                element: < UserEdit />,
            },
            {
                path: "/view_orders",
                exact: true,
                element: < ViewOrders />,
            },
            {
                path: "/view_products/:id",
                exact: true,
                element: < ViewProducts />,
            },
            {
                path: "/category",
                exact: true,
                element: < Category />,
            }
        ],
    },
    {
        path: "/login",
        exact: true,
        element: <Login />,
    },
    {
        path: "/forgot_password",
        exact: true,
        element: < ForgotPassword />,
    },
]);

