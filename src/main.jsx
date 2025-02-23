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
import Trainers from "./Components/Pages/Dashboard/Trainers/Trainers.jsx";
import Classes from "./Components/Pages/Classes/Classes.jsx";
import Community from "./Components/Pages/Community/Community.jsx";
import Dashboard from "./Components/Pages/Dashboard/Dashboard.jsx";
import Subscribers from "./Components/Pages/Dashboard/Subscribers/Subscribers.jsx";
import Applications from "./Components/Pages/Dashboard/Applications/Applications.jsx";
import Balance from "./Components/Pages/Dashboard/Balance/Balance.jsx";
import AddClass from "./Components/Pages/Dashboard/AddClass/AddClass.jsx";
import AddForum from "./Components/Pages/Dashboard/AddForum/AddForum.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BecomeTrainer from "./Components/Pages/Dashboard/Become a Trainer/BecomeTrainer.jsx";
import TrainerDetails from "./Components/Details/TrainerDetails.jsx";
import Activitylog from "./Components/Pages/Dashboard/ActivityLog/Activitylog.jsx";
import UserProfile from "./Components/Pages/Dashboard/UserProfile/UserProfile.jsx";
import UpdateProfile from "./Components/Forms/UpdateProfile.jsx";
const queryClient = new QueryClient();
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
    children: [
      {
        path: "subscribers",
        element: <Subscribers></Subscribers>,
      },
      {
        path: "trainers",
        element: <Trainers></Trainers>,
      },
      {
        path: "applications",
        element: <Applications></Applications>,
      },
      {
        path: "balance",
        element: <Balance></Balance>,
      },
      {
        path: "add-class",
        element: <AddClass></AddClass>,
      },
      {
        path: "add-forum",
        element: <AddForum></AddForum>,
      },
      {
        path: "become-a-trainer",
        element: <BecomeTrainer></BecomeTrainer>,
      },
      {
        path: "applicant-details/:id",
        element: <TrainerDetails></TrainerDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/applicant-details/${params.id}`),
      },
      {
        path: "activity-log",
        element: <Activitylog></Activitylog>,
      },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
