import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import VerifyOtp from "./components/VerifyOtp";
import Profile from "./components/CreateProfile";
import RoleSelection from "./components/RoleSelection";
import DashBoard from "./components/DashBoard";
import SearchResults from "./components/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute";
import LiveRide from "./components/LiveRide";
import PassengerDashBoard from "./components/PassengerDashBoard";
import MyRides from "./components/MyRides";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";

import RootPage from "./components/RootPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyOtp/:email" element={<VerifyOtp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createprofile" element={<Profile />} />

          <Route path="/roleselection" element={<RoleSelection />} />

          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/search-results"
            element={<SearchResults />}

          />

          <Route
            path="/live/:rideId"
            element={<LiveRide />}
          />
          <Route
            path="/my-rides"
            element={<MyRides />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;