import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import MasterAdmin from "./pages/MasterAdmin";

function App() {
  return (
    <div className="text-red-600">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/masteradmin/*" element={<MasterAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
