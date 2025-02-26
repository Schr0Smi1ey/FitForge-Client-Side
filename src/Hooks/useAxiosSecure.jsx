import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://fitforge-server.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser, Toast } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401 || status === 403) {
            signOutUser()
              .then(() => navigate("/login"))
              .catch((err) => Toast(err.message, "error"));
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutUser, Toast]);

  return axiosSecure;
};

export default useAxiosSecure;
