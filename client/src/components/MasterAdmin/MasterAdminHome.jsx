import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import useMasterAdmin from "../../store/MasterAdmin";
import { toast } from "react-toastify";
import AddTheater from "./AddTheater";
import EditTheater from "./EditTheater";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import Overview from "./Overview";

const list = [
  { path: "/masteradmin/", name: "Overview" },
  { path: "/masteradmin/add-theater", name: "Add Theater" },
  { path: "/masteradmin/edit-theater", name: "Edit Theater" },
  { path: "/masteradmin/add-movie", name: "Add Movie" },
  { path: "/masteradmin/edit-movie", name: "Edit Movie" }
];

function MasterAdminHome() {
  const logoutMasterAdmin = useMasterAdmin((state) => state.logoutMasterAdmin);
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
                <Link to={item.path} key={index}>
                  <p className="cursor-pointer border border-[#ffffff4d] py-[5px] rounded-[5px] px-[1rem]">
                    {item.name}
                  </p>
                </Link>
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
      <div className="w-[80%] h-full">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/add-theater" element={<AddTheater />} />
          <Route path="/edit-theater" element={<EditTheater />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/edit-movie" element={<EditMovie />} />
          <Route path="*" element={<Navigate to={"/masteradmin"} replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default MasterAdminHome;
