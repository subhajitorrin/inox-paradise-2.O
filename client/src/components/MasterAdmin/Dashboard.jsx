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
      <div className="w-[20%] h-full border-r border-[#353333] px-[1%] py-[2%] flex flex-col justify-between">
        <div className="">
          <div className="text-white text-[2rem] font-[500] text-center mb-[2rem]">
            <h2>Welcome</h2>
            <h2 className="mt-[-15px]">Master Admin</h2>
          </div>
          <div className="text-white font-[500] pl-[16%] text-[16px] flex gap-[2rem] flex-col">
            {list.map((item, index) => {
              return (
                <p key={index} className="cursor-pointer">
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-full text-[16px] font-[500] bg-[#ff6a00] text-white rounded-[5px] py-[5px]">
            Logout
          </button>
        </div>
      </div>
      <div className="w-[80%] h-full"></div>
    </div>
  );
}

export default Dashboard;
