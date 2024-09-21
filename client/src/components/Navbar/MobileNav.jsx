import React from "react";
import { RxCross2 } from "react-icons/rx";

function MobileNav({ toggleMobileNav, setToggleMobileNav }) {
  return (
    <div
      className={`transition-all ease-linear duration-200 fixed top-0 left-0 w-full h-full z-[100] ${
        toggleMobileNav ? "bg-[rgba(0,0,0,0.5)] backdrop-blur-[10px]" : ""
      }`}
      style={{
        opacity: toggleMobileNav ? 1 : 0,
        pointerEvents: toggleMobileNav ? "auto" : "none"
      }}
    >
      <RxCross2
        onClick={() => {
          setToggleMobileNav(false);
        }}
        className="text-white text-[25px] font-[600] absolute right-[5%] top-[2.5%]"
      />
    </div>
  );
}

export default MobileNav;
