import "./App.css";
import React from "react";
import {
  Outlet,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import SignUp from "./pages/SignUp";
import { EditProfile } from "./pages/EditProfile";
import { getUserInfo } from "./services/userServices";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect((p) => {
    const getData = async () => {
      let userName = localStorage.getItem("userName");
      if (!userName) navigate("/login");
      let res = await getUserInfo(userName);
      setUser(res.user);
      localStorage.setItem("userName", user);
    };
    getData();
  }, []);

  return (
    <>
      {user === null && <Sidebar></Sidebar>}
      <Routes>
        <Route>
          <Route path="/" element={user !== null ? <Home /> : <Login />} />
          <Route path="/profile:id" element={<Profile />} />
          <Route
            path="/SocialMediaFrontend"
            element={<Navigate to="/login" replace />}
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
