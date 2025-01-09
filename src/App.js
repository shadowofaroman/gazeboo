import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginPage from "./components/_login";
import RegisterAdminPage from "./components/_registerAdmin"; // Import RegisterAdminPage
import PrivateRoute from "./components/_protectRouter";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login Page Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Register Admin Page Route */}
      <Route path="/register-admin" element={<RegisterAdminPage />} />

      {/* Dashboard Route with PrivateRoute */}
      <Route
  //path="*"
  path="/dashboard/*"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
    </Routes>
  );
}

export default App;
