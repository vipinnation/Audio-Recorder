import { getCookie } from "cookies-next";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/auth/login.page";

const useAuth = () => {
  let user = {
    loggedIn: getCookie('auth-token') ? true:false,
  };

  return user && user.loggedIn;
};
const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
