import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GridLoader } from "react-spinners";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#A94A4A" size={110} />
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
