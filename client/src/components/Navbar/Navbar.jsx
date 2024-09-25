import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMobile } from "../../store/ScreenWidth";
import MobileNav from "./MobileNav";
import useMovie from "../../store/Movie";
import { RxCross2 } from "react-icons/rx";
import useDebounce from "../../hook/useDebounce.js";
import SearchCard from "./SearchCard.jsx";
function Navbar() {
  const { isMobile } = useMobile();
  const navigate = useNavigate();
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const {
    searchText,
    setSearchText,
    searchMovie,
    searchedList,
    searchLoading
  } = useMovie();

  const debouncedSearch = useDebounce(searchText);

  useEffect(() => {
    async function handleSearch() {
      await searchMovie(debouncedSearch);
    }
    handleSearch();
  }, [debouncedSearch, searchMovie]);

  if (isMobile) {
    return (
      <>
        <MobileNav
          toggleMobileNav={toggleMobileNav}
          setToggleMobileNav={setToggleMobileNav}
        />
        <div className="w-full py-[20px] bg-[white] flex justify-between items-center px-[5%]">
          <div className="flex gap-[2rem] items-center">
            <h2
              onClick={() => {
                navigate("/");
              }}
              className="text-black cursor-pointer font-bold text-[22px] flex items-center gap-[2px]"
            >
              <span>INOX</span>
              <IoTicketOutline className="text-[30px]" />
              <span>PARADISE</span>
            </h2>

            {/* <div className="relative w-[35vw] flex items-center">
            <input
              type="text"
              className="w-[100%] py-[5px] rounded-[10px] px-[20px] text-[14px] text-black border border-[#00000031] outline-none"
              placeholder="Search your favourite movie"
            />
            <IoMdSearch className="text-[22px] absolute right-[5px] text-black" />
          </div> */}
          </div>

          <div className="flex gap-[2rem] items-center">
            <div className="flex text-black items-center cursor-pointer gap-[2px]">
              <IoChevronDownSharp className="text-[14px]" />
              <span className="text-[14px] font-[500]">Kolkata</span>
            </div>

            {/* <div className="">
            <button className="font-[500] bg-[#F84464] text-white text-[14px] py-[2px] px-[1.5rem] rounded-[7px]">
              Login
            </button>
          </div> */}

            <AiOutlineMenu
              className="text-[22px] cursor-pointer"
              onClick={() => {
                setToggleMobileNav(true);
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="relative w-full py-[20px] bg-[white] flex justify-between items-center px-[10%]">
      {/* search container */}
      {searchText !== "" && (
        <div className="top-[100%] overflow-y-auto left-[0] absolute z-[100] h-[90vh] w-full bg-white px-[10%]">
          {searchedList &&
            searchedList.map((item, index) => {
              return <SearchCard item={item} key={index} />;
            })}
        </div>
      )}

      <div className="flex gap-[2rem] items-center">
        <h2
          onClick={() => {
            navigate("/");
          }}
          className="text-black cursor-pointer font-bold text-[22px] flex items-center gap-[2px]"
        >
          <span>INOX</span>
          <IoTicketOutline className="text-[30px]" />
          <span>PARADISE</span>
        </h2>

        <div className="relative w-[35vw] flex items-center">
          <input
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
            className="w-[100%] pr-[60px] py-[5px] rounded-[10px] px-[20px] text-[14px] text-black border border-[#00000031] outline-none"
            placeholder="Search your favourite movie"
          />
          {searchText !== "" && (
            <RxCross2
              onClick={() => setSearchText("")}
              className="text-[18px] cursor-pointer absolute right-[35px] text-black"
            />
          )}
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
