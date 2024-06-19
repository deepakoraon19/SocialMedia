import "./App.css";
import React from "react";
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useEffect, useState } from "react";
import axios from "axios";

function Layout() {
  const [user, setUser] = useState({});
  const location = useLocation();
  useEffect(p =>{
    // fetch("http://127.0.0.1:8080/user", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*"
    //   },
    // }).then(j => console.log(j))
    axios.get(`http://127.0.0.1:8080/user`).then(j => console.log(j))
  }, [])
  // When the user log-in, the user will get a token
  return user?.token ? (
    <Outlet user={user}/> // if the user has the token, then it can access all the pages in the outlet
  ) : (
    // Else navigate the user to login page and also pass the state of location from where it was accessing
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile:id' element={<Profile />} />
          <Route path='/SocialMediaFrontend' element={<Navigate to='/login' replace />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
