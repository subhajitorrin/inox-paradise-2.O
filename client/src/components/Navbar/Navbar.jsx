import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";

function Navbar() {
  return (
    <div className="w-full py-[20px] bg-[white] flex justify-between items-center px-[10%]">
      <div className="flex gap-[2rem] items-center">
        <h2 className="text-black font-bold text-[22px] flex items-center gap-[2px]">
          <span>INOX</span>
          <IoTicketOutline className="text-[30px]" />
          <span>PARADISE</span>
        </h2>

        <div className="relative w-[35vw] flex items-center">
          <input
            type="text"
            className="w-[100%] py-[5px] rounded-[10px] px-[20px] text-[14px] text-black border border-[#00000031] outline-none"
            placeholder="Search your favourite movie"
          />
          <IoMdSearch className="text-[22px] absolute right-[5px] text-black" />
        </div>
      </div>

      <div className="flex gap-[2rem] items-center">
        <div className="flex text-black items-center cursor-pointer gap-[2px]">
          <IoChevronDownSharp className="text-[14px]" />
          <span className="text-[14px] font-[500]">Kolkata</span>
        </div>

        <div className="">
          <button className="font-[500] bg-[#F84464] text-white text-[14px] py-[2px] px-[1.5rem] rounded-[7px]">
            Login
          </button>
        </div>

        <AiOutlineMenu className="text-[22px] cursor-pointer" />
      </div>
    </div>
  );
}

export default Navbar;
