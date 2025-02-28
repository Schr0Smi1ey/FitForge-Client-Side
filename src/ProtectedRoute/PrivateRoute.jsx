import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GridLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      const timeout = setTimeout(() => {
        setIsRedirecting(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [loading, user]);

  if (loading || (!user && !isRedirecting)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#A94A4A" size={50} />
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
