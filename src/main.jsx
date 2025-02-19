import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Layout/Root.jsx";
import ErrorPage from "./Components/Shared/ErrorPage/ErrorPage.jsx";
import Home from "./Components/Pages/Home/Home.jsx";
import AuthProvider from "./Contexts/AuthContext/AuthProvider.jsx";
import Login from "./Components/Forms/Login.jsx";
import SignUp from "./Components/Forms/SignUp.jsx";
import Trainers from "./Components/Pages/Trainers/Trainers.jsx";
import Classes from "./Components/Pages/Classes/Classes.jsx";
import Community from "./Components/Pages/Community/Community.jsx";
import Dashboard from "./Components/Pages/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
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
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/trainers",
        element: <Trainers></Trainers>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
