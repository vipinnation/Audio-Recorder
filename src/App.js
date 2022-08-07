import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavbarComponent from "./components/ui/navbar.component";
import ProtectedRoute from "./middleware/protected.route";

import ForgotPassword from "./pages/auth/forgotpassword.page";
import LoginPage from "./pages/auth/login.page";
import SignUpPage from "./pages/auth/signup-page";
import HomePage from "./pages/public/home.page";
import ProfilePage from "./pages/user/profile.page";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/sign-up" element={<SignUpPage />} />
          <Route exact paht="/forgot-password" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
