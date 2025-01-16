import "./App.css";
import React from "react";
import { Navigate, Route, Routes, useLocation, Outlet } from "react-router-dom";
import { Home, Login, Register, ResetPassword } from "./pages";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import { EditProfile } from "./pages/EditProfile";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const url = window.location.href;
  const [profilePic, setProfilePic] = useState("");

  const [userId, setUserId] = useState(
    () =>
      store.getState().user.userState._id ??
      localStorage.getItem("userId") ??
      ""
  );

  function Layout() {
    const location = useLocation();
    return userId !== "" && userId.length ? (
      <Outlet />
    ) : (
      <Navigate to="/Socia/login" state={{ from: location }} replace />
    );
  }

  return (
    <Provider store={store}>
      {userId !== "" && !url.includes("login") && !url.includes("signup") && (
        <Sidebar
          userId={userId}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          setUserId={setUserId}
        ></Sidebar>
      )}
      <Routes>
        <Route path="/Socia" element={<Navigate to="/Socia/home" />} />
        <Route path="/Socia" element={<Layout />}>
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="edit-profile"
            element={<EditProfile setProfilePic={setProfilePic} />}
          />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/Socia/login" element={<Login setUserId={setUserId} />} />
        <Route path="/Socia/signup" element={<SignUp />} />
      </Routes>
    </Provider>
  );
}

export default App;
