import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home, Login, Profile, Register, ResetPassword } from './pages';

function Layout() {
  const user = null;
  const location = useLocation();

  // When the user log-in, the user will get a token
  return user?.token ? (
    <Outlet/> // if the user has the token, then it can access all the pages in the outlet
  ) :  (
    // Else navigate the user to login page and also pass the state of location from where it was accessing
    <Navigate to='/login' state= {{ from : location}} replace />
  );
}
function App() {
  return (
    <div >
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile:id' element={<Profile />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
