import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import VerifyOtp from "./components/VerifyOtp";
import Profile from "./components/Profile";
import Home from "./components/Home";
import PassengerHome from "./components/PassengerHome";
import RoleSelection from "./components/RoleSelection";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyOtp/:email" element={<VerifyOtp />} />
        <Route path="/createprofile" element={<Profile/>}></Route>
        <Route path="/passengerhome" element={<PassengerHome />} />
        <Route path="/roleselection" element={<RoleSelection />} />
        <Route path="/dashboard" element={<DashBoard />} />


        

        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;