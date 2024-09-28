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
import MovieSchedule from "./pages/MovieSchedule";
import SeatMatrix from "./pages/SeatMatrix";
import SideNavbarDesktop from "./components/Navbar/SideNavbarDesktop";
import Login from "./components/Login/Login";
import  useUser  from "./store/User";
import Register from "./components/Register/Register";

function App() {
  const { setMobile } = useMobile();
  const { isLogin } = useUser();

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
      <SideNavbarDesktop />
      {isLogin === true && <Login />}
      {isLogin === false && <Register />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/schedule/:id" element={<MovieSchedule />} />
        <Route path="/seatmatrix/:scheduleid" element={<SeatMatrix />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/masteradmin/*" element={<MasterAdmin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer autoClose={1000} position="top-center" />
    </div>
  );
}

export default App;
