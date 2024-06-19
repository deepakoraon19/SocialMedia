import "./App.css";
import React from "react";
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState({});
  useEffect((p) => {
    // axios
    //   .post(
    //     `${process.env.REACT_APP_URL}/user/login`,
    //     {},
    //     {
    //       headers: { "Access-Control-Allow-Origin": "*" },
    //     }
    //   )
    //   .then((j) => {
    //     setUser(j.data);
    //     console.log(j.data.user);
    //   })
    //   .catch((p) => console.log(p));
  }, []);
  return (
    <>
      {user === null && <Sidebar></Sidebar>}
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
          <Route path="/profile:id" element={<Profile />} />
          <Route
            path="/SocialMediaFrontend"
            element={<Navigate to="/login" replace />}
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
