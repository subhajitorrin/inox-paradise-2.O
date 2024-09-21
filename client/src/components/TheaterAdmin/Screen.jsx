import React, { useState } from "react";
import { toast } from "react-toastify";
import useTheaterAdmin from "../../store/TheaterAdmin";

function Screen() {
  const [screenName, setscreenName] = useState("");
  const [screenType, setscreenType] = useState("");
  const { addScreen } = useTheaterAdmin();
  async function handleAddScreen() {
    if (screenName === "" || screenType === "") {
      toast.warn("Fill all the fields");
      return;
    }
    try {
      await addScreen(screenName, screenType);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-[10px]">
      <div className="text-white flex justify-between items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-transparent">
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
        </div>

        <button
          onClick={handleAddScreen}
          className="bg-[#FF0051] text-white px-[20px] py-[5px] rounded-lg hover:bg-[#cf0142]"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Screen;
