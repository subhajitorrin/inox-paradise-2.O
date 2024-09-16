import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/MasterAdmin/Login";
import Dashboard from "../components/MasterAdmin/Dashboard";

function MasterAdmin() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default MasterAdmin;
