import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import MasterAdmin from "./pages/MasterAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieDetail from "./pages/MovieDetail";
import { useMobile } from "./store/ScreenWidth";

function App() {
  const { setMobile } = useMobile();

  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="select-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/masteradmin/*" element={<MasterAdmin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
