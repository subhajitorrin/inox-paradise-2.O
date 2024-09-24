import React, { useEffect } from "react";
import ShowTimeCard from "./ShowTimeCard";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { CiCoffeeCup } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";

function TheaterCards({ theater, list }) {
  return (
    <div className="w-[100%] p-[10px] bg-white border-b border-[#00000024] rounded-[7px]">
      <div className="">
        <div className="flex justify-between">
          <div className="text-[1.1rem] font-[500] flex items-center">
            <p>{theater.name}</p>&nbsp;•&nbsp;
            <p className="text-[70%] font-[400]">Non-cancellable</p>
          </div>
          <div className="flex font-[500] gap-[5px] text-[80%] text-[#d0057f]">
            <p>Direction</p>
            <div className="gap-[5px] border border-[#00000000] rounded-[50%] flex items-center justify-center h-[20px] w-[20px]">
              <LiaMapMarkedAltSolid className="text-[22px]" />
            </div>
          </div>
        </div>
        <p className="text-[85%]">{theater.address}</p>
      </div>
      <div className="flex gap-[10px] items-center mt-[5px]">
        <div className="flex font-[500] gap-[5px] text-[80%] text-[#0582d0]">
          <p>Parking</p>
          <div className="gap-[5px] border border-[#00000000] rounded-[50%] flex items-center justify-center h-[20px] w-[20px]">
            <IoCarSportOutline className="text-[22px]" />
          </div>
        </div>
        <div className="flex font-[500] gap-[5px] text-[80%] text-[#3fd005]">
          <p>Food</p>
          <div className="gap-[5px] border border-[#00000000] rounded-[50%] flex items-center justify-center h-[20px] w-[20px]">
            <IoFastFoodOutline className="text-[22px]" />
          </div>
        </div>
        <div className="flex font-[500] gap-[5px] text-[80%] text-[#d07105]">
          <p>Coffee</p>
          <div className="gap-[5px] border border-[#00000000] rounded-[50%] flex items-center justify-center h-[20px] w-[20px]">
            <CiCoffeeCup className="text-[22px]" />
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] flex-wrap mt-[10px]">
        {list.map((item, index) => {
          return <ShowTimeCard show={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default TheaterCards;
