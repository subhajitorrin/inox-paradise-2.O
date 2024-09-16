import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import MasterAdmin from "./pages/MasterAdmin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="text-red-600">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/masteradmin/*" element={<MasterAdmin />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
