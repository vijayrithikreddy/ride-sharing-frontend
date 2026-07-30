import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import VerifyOtp from "./VerifyOtp";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp/:email" element={<VerifyOtp />} />
        
      </Routes>
      <Profile></Profile>
    </BrowserRouter>
  );
}

export default App;