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
import SearchResults from "./components/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute";
import LiveRide from "./components/LiveRide";
import PassengerDashBoard from "./components/PassengerDashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyOtp/:email" element={<VerifyOtp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/createprofile" element={<Profile />} />

          <Route path="/passengerhome" element={<PassengerHome />} />

          <Route path="/roleselection" element={<RoleSelection />} />

          <Route path="/dashboard" element={<DashBoard />} />

          <Route
            path="/search-results"
            element={<SearchResults />}
            
          />
          <Route
            path="/passengerdashboard"
            element={<PassengerDashBoard />}
            
          />
          
          <Route
    path="/live/:rideId"
    element={<LiveRide />}
/>
        </Route>
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;