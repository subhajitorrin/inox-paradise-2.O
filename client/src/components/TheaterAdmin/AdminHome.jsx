import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useTheaterAdmin from "../../store/TheaterAdmin";
import Schedule from "./Schedule/Schedule";
import Screen from "./Screen/Screen";
import Food from "./Food/Food";

const list = [
  { path: "/admin", name: "Overview" },
  { path: "/admin/food", name: "Food" },
  { path: "/admin/screen", name: "Screen" },
  { path: "/admin/schedule", name: "Schedule" },
  { path: "/admin/detail", name: "Theater Detail" }
];

function AdminHome() {
  const location = useLocation();
  const logoutAdmin = useTheaterAdmin((state) => state.logoutAdmin);
  return (
    <div className="h-screen bg-[#1e1d1d] flex">
      <div className="w-[15%] h-full border-r border-[#353333] items-center py-[1%] flex flex-col justify-between">
        <div className="">
          <div className="text-white text-[2rem] font-[700] text-center mb-[3rem] uppercase">
            <h2>Welcome</h2>
            <h2 className="mt-[-15px]">Admin</h2>
          </div>
          <div className="text-white  font-[500] text-[16px] flex gap-[1.5rem] flex-col">
            {list.map((item, index) => {
              return (
                <Link to={item.path} key={index}>
                  <p
                    style={{
                      border:
                        location.pathname === item.path
                          ? "1px solid #ffffff4d"
                          : ""
                    }}
                    className="cursor-pointer border border-transparent py-[5px] rounded-[5px] px-[1rem]"
                  >
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
              await logoutAdmin();
              toast.success("Logout successfull");
            }}
            className="w-[90%] text-[16px] font-[500] bg-[#ff0051] text-white rounded-[5px] py-[5px]"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-[85%] h-screen text-white">
        <div className="h-[8%]  flex items-center justify-center border-b border-[#353333] text-[25px] font-[500] uppercase">
          {list.map((item, index) => {
            if (item.path === location.pathname) {
              return <p key={index}>{item.name}</p>;
            }
          })}
        </div>
        <div className="h-[92%]">
          <Routes>
            {/* <Route path="" element={<Overview />} />
            <Route path="/theater" element={<AddTheater />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie" element={<EditMovie />} />
            <Route
              path="*"
              element={<Navigate to={"/masteradmin"} replace />}
            /> */}
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/screen" element={<Screen />} />
            <Route path="/food" element={<Food />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
