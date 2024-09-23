import React from "react";

function Schedule() {
  return (
    <div className="h-full w-full p-[10px]">
      <div className="text-white flex justify-between items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-transparent">
        {/* left side add screen  */}
        <div className="flex gap-[20px] items-center">
          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              Screen Name:
            </label>
            <input
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
            <button className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]">
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
              className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none "
            >
              <option value="">Select type</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              Category Name:
            </label>
            <input
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
            <button className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]">
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
