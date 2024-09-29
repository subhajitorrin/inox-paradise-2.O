import React from "react";
import { Label } from "@/components/ui/label";

function TopSection() {
  return (
    <div className="text-white flex z-[10] justify-between items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-[#1E1D1D]">
      <div className="flex items-center gap-[10px]">
        <div className="grid max-w-sm items-center gap-1.5 w-[400px]">
          <Label>Food image</Label>
          <input
            type="text"
            placeholder="Paste food image url"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>
        <div className="grid max-w-sm items-center gap-1.5 w-[200px]">
          <Label>Food Name</Label>
          <input
            type="text"
            placeholder="Enter food name"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none "
          />
        </div>
        <div className="grid w-[200px] max-w-sm items-center gap-1.5">
          <Label>Food Price</Label>
          <input
            type="number"
            placeholder="Enter food price"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="screenName" className="text-sm font-bold mb-1">
          &nbsp;
        </label>
        <button className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]">
          Add Food
        </button>
      </div>
    </div>
  );
}

export default TopSection;