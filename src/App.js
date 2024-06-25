import "./App.css";
import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  Outlet
} from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import { EditProfile } from "./pages/EditProfile";
import Sidebar from "./components/Sidebar";

function App() {
  const url = window.location.href;
  const [user, setUser] = useState(()=>localStorage.getItem("userId"));

  useEffect((p) => {
    setUser(getData());
  }, []);

  const getData = () => localStorage.getItem("userId");

  function Layout() {
    const location = useLocation();
    console.log(user)
    // When the user log-in, the user will get a token
    return user !== null && user.length ? (
      <Outlet /> // if the user has the token, then it can access all the pages in the outlet
    ) : (
      // Else navigate the user to login page and also pass the state of location from where it was accessing
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return (
    <>
      {user !== null && !url.includes("login") && !url.includes("signup") && (
        <Sidebar></Sidebar>
      )}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />}/>
          <Route path="/profile:id" element={<Profile />} />
          <Route
            path="/SocialMediaFrontend"
            element={<Navigate to="/login" replace />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
