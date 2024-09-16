import React from "react";
import { Routes, Route } from "react-router-dom";

const list = [
  { path: "/add-theater", name: "Add Theater" },
  { path: "/edit-theater", name: "Edit Theater" },
  { path: "/add-movie", name: "Add Movie" },
  { path: "/edit-movie", name: "Edit Movie" }
];

function Dashboard() {
  return (
    <div className="h-screen bg-[#1e1d1d] flex">
      <div className="w-[20%] h-full border-r border-[#353333]">
        <div className="text-white text-[2rem] font-[500] text-center">
          <h2>Welcome</h2>
          <h2 className="mt-[-15px]">Master Admin</h2>
        </div>
        <div className="text-white font-[500]">
          {list.map((item, index) => {
            return <p key={index} className="cursor-pointer">{item.name}</p>;
          })}
        </div>
      </div>
      <div className="w-[80%] h-full"></div>
    </div>
  );
}

export default Dashboard;
