import { Profiler } from "react";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Main from "../layout/Main";
import Wallet from "../components/Wallet";
import ErrorPage from "../components/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
const { createBrowserRouter } = require("react-router-dom");
// import Home from '../components/Home'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/wallet",
        element: (
          <PrivateRoutes>
            <Wallet></Wallet>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
