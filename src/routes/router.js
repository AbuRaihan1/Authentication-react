import { Profiler } from "react";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Main from "../layout/Main";
import Wallet from "../components/Wallet";
import ErrorPage from "../components/ErrorPage";
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
        element: <Profile></Profile>,
      },
      {
        path: "/wallet",
        element: <Wallet></Wallet>,
      },
    ],
  },
]);

export default router;
