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
import Trainers from "./Components/Pages/Trainers/Trainers.jsx";
import AllTrainers from "./Components/Pages/Dashboard/AllTrainers/AllTrainers.jsx";
import Trainer from "./Components/Details/Trainer.jsx";
import AddSlot from "./Components/Pages/Dashboard/AddSlot/AddSlot.jsx";
import ManageSlot from "./Components/Pages/Dashboard/ManageSlot/ManageSlot.jsx";
import PrivateRoute from "./ProtectedRoute/PrivateRoute.jsx";
import AdminRoute from "./ProtectedRoute/AdminRoute.jsx";
import BookTrainer from "./Components/Pages/BookTrainer/BookTrainer.jsx";
import Payment from "./Components/Pages/Payment/Payment.jsx";
import BookedTrainer from "./Components/Pages/Dashboard/BookedTrainer/BookedTrainer.jsx";
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
      {
        path: "/become-a-trainer",
        element: (
          <div className="pt-32">
            <PrivateRoute>
              <BecomeTrainer></BecomeTrainer>
            </PrivateRoute>
          </div>
        ),
      },
      {
        path: "/book-trainer/:trainerId/:slotId",
        element: (
          <PrivateRoute>
            <BookTrainer />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const { trainerId, slotId } = params;
          return fetch(
            `http://localhost:3000/book-trainer?trainerId=${trainerId}&slotId=${slotId}`
          );
        },
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/trainer-details/:id",
        element: (
          <PrivateRoute>
            <Trainer></Trainer>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/trainer-details/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "subscribers",
        element: (
          <AdminRoute>
            <Subscribers></Subscribers>
          </AdminRoute>
        ),
      },
      {
        path: "trainers",
        element: (
          <AdminRoute>
            <AllTrainers></AllTrainers>
          </AdminRoute>
        ),
      },
      {
        path: "applications",
        element: (
          <AdminRoute>
            <Applications></Applications>
          </AdminRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <AdminRoute>
            <Balance></Balance>
          </AdminRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <AdminRoute>
            <AddClass></AddClass>
          </AdminRoute>
        ),
      },

      {
        path: "add-slot",
        element: <AddSlot></AddSlot>,
      },
      {
        path: "manage-slots",
        element: <ManageSlot></ManageSlot>,
      },
      {
        path: "add-forum",
        element: <AddForum></AddForum>,
      },
      {
        path: "trainer-details/:id",
        element: (
          <AdminRoute>
            <TrainerDetails></TrainerDetails>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/trainer-details/${params.id}`),
      },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },

      {
        path: "become-a-trainer",
        element: <BecomeTrainer></BecomeTrainer>,
      },

      {
        path: "activity-log",
        element: <Activitylog></Activitylog>,
      },
      {
        path: "booked-trainers",
        element: <BookedTrainer></BookedTrainer>,
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
