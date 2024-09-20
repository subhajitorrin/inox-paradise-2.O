import React from "react";
import { IoMdSearch } from "react-icons/io";

function Navbar() {
  return (
    <div className="w-full h-[100px] bg-[white] flex justify-between items-center">
      <h2 className="text-black font-bold text-[22px]">INOX PARADISE</h2>
      <div className="relative w-[400px] flex items-center">
        <input
          type="text"
          className="w-[100%] py-[5px] rounded-[10px] px-[20px] text-[14px] text-black border border-[#00000031] outline-none"
          placeholder="Search your favourite movie"
        />
        <IoMdSearch className="text-[22px] absolute right-[5px] text-black" />
      </div>
    </div>
  );
}

export default Navbar;
