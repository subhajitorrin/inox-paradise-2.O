import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineArrowRight } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import useUser from "@/store/User";
import { LuWallet } from "react-icons/lu";

function SideNavbarDesktop() {
  const navigate = useNavigate();
  const { toggleSidenavbar, setToggleSideNavbar, user, Logout, setIsLogin } =
    useUser();

  const randomMenuList = [
    {
      icon: <IoTicketOutline />,
      name: "Your Bookings",
      desc: "View all your bookings",
      path: "/mybookings"
    },
    {
      icon: <MdHelpOutline />,
      name: "Help & Support",
      desc: "Get help from support team",
      path: "/help"
    },
    {
      icon: <MdHelpOutline />,
      name: "FAQs",
      desc: "Frequently Asked Questions",
      path: "/faq"
    }
  ];

  const [menulist, setmenulist] = useState(randomMenuList);

  async function handleLogout() {
    await Logout();
    setToggleSideNavbar(false);
  }

  function handleOffSidebar(e) {
    let flag = false;
    e.target.classList.forEach((item) => {
      if (item === "sidenavbar") {
        flag = true;
      }
    });
    if (flag) {
      setToggleSideNavbar(false);
    }
  }

  return (
    <div
      className="bg-[#00000049] z-[100] fixed w-full h-screen transition-all ease-linear duration-200 backdrop-filter backdrop-blur-[5px]"
      style={{
        opacity: toggleSidenavbar ? "1" : "0",
        pointerEvents: toggleSidenavbar ? "auto" : "none"
      }}
      onClick={handleOffSidebar}
    >
      <div
        style={{ right: toggleSidenavbar ? "0" : "-100%" }}
        className=" bg-white select-none transition-all ease-linear duration-200 absolute z-[100] h-full w-[320px] rounded-l-[20px]"
      >
        <div className="w-full py-[20px] flex flex-col gap-[1rem]">
          <p className="font-bold text-[20px] px-[1rem]">
            {user === null && (
              <span className="font-[500] text-[17px] flex items-center gap-[10px]">
                <FaRegCircleUser className="text-[25px] " />
                Guest
              </span>
            )}
          </p>
          {user !== null ? (
            <>
              <div className="flex items-center justify-between px-[5%] mt-[1.2rem]">
                <p className="font-[500] text-[100%] flex items-center gap-[10px]">
                  <FaRegCircleUser className="text-[1.3rem] " />
                  {user.name}
                </p>
                <div className="font-[500] flex items-center gap-[10px]">
                  <LuWallet />
                  <p className="text-[100%]">Wallet {user.wallet}</p>
                </div>
              </div>

              <div className="flex flex-col gap-[1rem]">
                {menulist.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(item.path);
                        setToggleSideNavbar(false);
                      }}
                      key={index}
                      className="flex flex-col cursor-pointer hover:bg-[#c6c6c6] px-[1rem] py-[5px]"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-[20px] items-center">
                          <span className="text-[1.3rem]">{item.icon}</span>
                          <div>
                            <p className="text-[100%]">{item.name}</p>
                            <p className="text-[.75rem]">{item.desc}</p>
                          </div>
                        </div>
                        <MdOutlineArrowRight />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-[1rem]">
              <p className="text-center">* Log in to purchase tickets.</p>
            </div>
          )}
        </div>
        <div className="w-full px-[1rem] absolute bottom-[20px]">
          <div
            onClick={() => {
              window.open("/admin", "_blank");
            }}
            className="hover:bg-[#e4e4e4] hover:text-[black] mb-[1rem] w-full transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center border border-[#00000054] rounded-[5px] text-center py-[5px] font-[500]"
          >
            <RiAdminLine className="absolute left-[20px]" />
            <p>Admin Login</p>
          </div>
          {user === null ? (
            <button
              onClick={() => {
                setIsLogin(true);
              }}
              className="w-full rounded-[7px] bg-[#da4b63] text-white py-[5px] font-[500]"
            >
              Login
            </button>
          ) : (
            <button
              className="w-full rounded-[7px] bg-[#da4b63] text-white py-[5px] font-[500]"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
        <RxCross1
          className="text-black absolute top-[25px] right-[20px] cursor-pointer font-bold text-[19px]"
          onClick={() => {
            setToggleSideNavbar(false);
          }}
        />
      </div>
      <div className="h-full w-full sidenavbar"></div>
    </div>
  );
}

export default SideNavbarDesktop;
