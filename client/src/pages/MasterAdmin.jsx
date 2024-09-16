import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/MasterAdmin/Login";
import Dashboard from "../components/MasterAdmin/Dashboard";
import { useMasterAdmin } from "../store/MasterAdmin";

function ProtectedRoutes({ children }) {
  const isMasterAuthenticated = useMasterAdmin(
    (state) => state.isMasterAuthenticated
  );

  if (!isMasterAuthenticated) {
    return <Navigate to="/masteradmin/login" replace />;
  }
  return children;
}

function RedirectRoutes({ children }) {
  const isMasterAuthenticated = useMasterAdmin(
    (state) => state.isMasterAuthenticated
  );
  if (isMasterAuthenticated) {
    return <Navigate to="/masteradmin/dashboard" replace />;
  }
  return children;
}

function MasterAdmin() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/masteradmin/dashboard"} replace />}
        />
        <Route
          path="/login"
          element={
            <RedirectRoutes>
              <Login />
            </RedirectRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="*"
          element={<Navigate to="/masteradmin/dashboard" replace />}
        />
      </Routes>
    </div>
  );
}

export default MasterAdmin;
