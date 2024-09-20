import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousol from "../components/Home/Carousol";
import MovieRows from "../components/Home/MovieRows";

function Home() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full">
      <Navbar />
      <Carousol />
      <MovieRows />
    </div>
  );
}

export default Home;
