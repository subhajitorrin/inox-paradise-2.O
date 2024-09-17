import React from "react";
import { Routes, Route } from "react-router-dom";
import  useMasterAdmin  from "../../store/MasterAdmin";
import { toast } from "react-toastify";

const list = [
  { path: "/add-theater", name: "Add Theater" },
  { path: "/edit-theater", name: "Edit Theater" },
  { path: "/add-movie", name: "Add Movie" },
  { path: "/edit-movie", name: "Edit Movie" }
];

function Dashboard() {
  const  logoutMasterAdmin  = useMasterAdmin(
    (state) => (state.logoutMasterAdmin)
  );
  return (
    <div className="h-screen bg-[#1e1d1d] flex">
      <div className="w-[20%] h-full border-r border-[#353333] items-center py-[1%] flex flex-col justify-between">
        <div className="">
          <div className="text-white text-[2rem] font-[700] text-center mb-[3rem] uppercase">
            <h2>Welcome</h2>
            <h2 className="mt-[-15px]">Master Admin</h2>
          </div>
          <div className="text-white  font-[500] text-[16px] flex gap-[1.5rem] flex-col">
            {list.map((item, index) => {
              return (
                <p
                  key={index}
                  className="cursor-pointer border border-[#ffffff4d] py-[5px] rounded-[5px] px-[1rem]"
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            onClick={async () => {
              await logoutMasterAdmin();
              toast.success("Logout successfull");
            }}
            className="w-[90%] text-[16px] font-[500] bg-[#ff0051] text-white rounded-[5px] py-[5px]"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-[80%] h-full"></div>
    </div>
  );
}

export default Dashboard;
