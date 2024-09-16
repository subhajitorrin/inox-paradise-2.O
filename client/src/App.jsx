import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import MasterAdmin from "./components/MasterAdmin";

function App() {
  return (
    <div className="text-red-600">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/masteradmin" element={<MasterAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
