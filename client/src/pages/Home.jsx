import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousol from "../components/Home/Carousol";

function Home() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full">
      <Navbar />
      <Carousol />
    </div>
  );
}

export default Home;
