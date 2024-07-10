import "./App.css";
import React from "react";
import { Navigate, Route, Routes, useLocation, Outlet } from "react-router-dom";
import { Home, Login, Register, ResetPassword } from "./pages";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import { EditProfile } from "./pages/EditProfile";
import Sidebar from "./components/Sidebar";
import UserContext from "./contexts/userContext";

function App() {
  const url = window.location.href;
  const [userId, setUserId] = useState(()=>localStorage.getItem("userId") ?? "");

  function Layout() {
    const location = useLocation();
    return userId !== "" && userId.length ? (
      <Outlet />
    ) : (
      <Navigate to="/Socia/login" state={{ from: location }} replace />
    );
  }

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {userId !== "" && !url.includes("login") && !url.includes("signup") && (
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
    </UserContext.Provider>
  );
}

export default App;
