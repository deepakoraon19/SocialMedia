import "./App.css";
import React from "react";
import { Navigate, Route, Routes, useLocation, Outlet } from "react-router-dom";
import { Home, Login, Register, ResetPassword } from "./pages";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import { EditProfile } from "./pages/EditProfile";
import Sidebar from "./components/Sidebar";

function App() {
  const url = window.location.href;
  const [user, setUser] = useState(() => localStorage.getItem("userId"));

  useEffect((p) => {
    setUser(getData());
  }, []);

  const getData = () => localStorage.getItem("userId");

  function Layout() {
    const location = useLocation();
    return user !== null && user.length ? (
      <Outlet />
    ) : (
      <Navigate to="/Socia/login" state={{ from: location }} replace />
    );
  }

  return (
    <>
      {user !== null && !url.includes("login") && !url.includes("signup") && (
        <Sidebar></Sidebar>
      )}
      <Routes>
        <Route path="/Socia" element={<Navigate to="/Socia/home" />} />
        <Route path="/Socia" element={<Layout />}>
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/Socia/login" element={<Login />} />
        <Route path="/Socia/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
