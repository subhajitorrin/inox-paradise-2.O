import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useTheaterAdmin from "../../store/TheaterAdmin";
import { set } from "mongoose";
import ScreenCard from "./ScreenCard";

function Screen() {
  const [refetch, setRefetch] = useState(false);
  const [screenName, setscreenName] = useState("");
  const [screenType, setscreenType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedScreenForCategory, setSelectedScreenForCategory] =
    useState("");
  const { addScreen, screens, getScreens, addCategory } = useTheaterAdmin();

  useEffect(() => {
    getScreens();
  }, [refetch]);

  async function handleAddScreen() {
    if (screenName === "" || screenType === "") {
      toast.warn("Fill all the fields");
      return;
    }
    try {
      await addScreen(screenName, screenType);
      setRefetch(!refetch);
      setscreenName("");
      setscreenType("");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddCategory() {
    if (selectedScreenForCategory === "" || categoryName === "") {
      toast.warn("Fill all the fields");
      return;
    }
    try {
      console.log(selectedScreenForCategory, categoryName);
      await addCategory(selectedScreenForCategory, categoryName);
      setRefetch(!refetch);
      setSelectedScreenForCategory("");
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-[10px] h-full">
      <div className="text-white flex justify-between items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-transparent">
        {/* left side add screen  */}
        <div className="flex gap-[20px] items-center">
          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              Screen Name:
            </label>
            <input
              onChange={(e) => {
                setscreenName(e.target.value);
              }}
              value={screenName}
              type="text"
              id="screenName"
              name="screenName"
              placeholder="Enter Screen Name"
              className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="screenType" className="text-sm font-bold mb-1">
              Screen Type:
            </label>
            <select
              id="screenType"
              name="screenType"
              onChange={(e) => {
                setscreenType(e.target.value);
              }}
              value={screenType}
              className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none "
            >
              <option value="">Select type</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
              <option value="4DX">4DX</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              &nbsp;
            </label>
            <button
              onClick={handleAddScreen}
              className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]"
            >
              Add Screen
            </button>
          </div>
        </div>

        {/* right side add category for a screen */}
        <div className="flex gap-[20px] items-center">
          <div className="flex flex-col">
            <label htmlFor="selectScreen" className="text-sm font-bold mb-1">
              Select screen:
            </label>
            <select
              id="selectScreen"
              name="selectScreen"
              onChange={(e) => {
                setSelectedScreenForCategory(e.target.value);
              }}
              value={selectedScreenForCategory}
              className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none "
            >
              <option value="">Select type</option>
              {screens.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.screenName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              Category Name:
            </label>
            <input
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              value={categoryName}
              type="text"
              id="screenName"
              name="screenName"
              placeholder="Enter Category Name"
              className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              &nbsp;
            </label>
            <button
              onClick={handleAddCategory}
              className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* display screens */}
      <div className="mt-[1rem] flex flex-col gap-[10px] h-[80%] overflow-y-auto scrollNone">
        {screens.map((item, index) => {
          return <ScreenCard key={index} screen={item} setRefetch={setRefetch}/>;
        })}
      </div>
    </div>
  );
}

export default Screen;
