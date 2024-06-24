import "./App.css";
import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import { EditProfile } from "./pages/EditProfile";
// import { getUserInfo } from "./services/userServices";
import Sidebar from "./components/Sidebar";

function App() {
  const navigate = useNavigate();
  const url = window.location.href;
  const [user, setUser] = useState(null);

  useEffect((p) => {
    setUser(getData());
  }, []);

  useEffect((p) => {
    user !== null && user.length > 0 ? navigate("home") : navigate("login");
  }, [user]);

  const getData = () => localStorage.getItem("userName");

  return (
    <>
      {user !== null && !url.includes("login") && !url.includes("signup") && (
        <Sidebar></Sidebar>
      )}
      <Routes>
        {/* <Route> */}
        <Route path="/" />
        <Route path="/profile:id" element={<Profile />} />
        <Route
          path="/SocialMediaFrontend"
          element={<Navigate to="/login" replace />}
        />
        {/* </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
