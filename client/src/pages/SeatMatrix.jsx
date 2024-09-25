import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMovie from "../store/Movie";
import { IoChevronBackOutline } from "react-icons/io5";

const options = { day: "numeric", month: "short" };

function SeatMatrix() {
  const { scheduleid } = useParams();
  const navigate = useNavigate();
  const { seatMatrix, getSeatMatrix } = useMovie();

  useEffect(() => {
    if (scheduleid) {
      getSeatMatrix(scheduleid);
    }
  }, [getSeatMatrix, scheduleid]);

  useEffect(() => {
    console.log(seatMatrix);
  }, [seatMatrix]);

  return (
    seatMatrix &&
    seatMatrix.movie && (
      <div className="h-screen w-full flex flex-col">
        {/* top section */}
        <div className="text-white bg-black px-[5%] py-[15px] w-full border-b border-[#00000051] flex justify-between items-center">
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBackOutline className=" text-[25px]  cursor-pointer" />
          </span>
          <div className="">
            <h2 className="text-[25px] font-bold">
              {seatMatrix.movie.title} - {seatMatrix.language}
            </h2>
            <p className="text-[85%]">
              {new Date(seatMatrix.date).toLocaleDateString("en-GB", options)}
              ,&nbsp;
              {new Date(seatMatrix.startTime).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
              &nbsp;at {seatMatrix.theater.name},&nbsp;
              {seatMatrix.theater.city}
            </p>
          </div>
          <div className=""></div>
        </div>

        {/* index */}
        <div className="flex w-full px-[10%] justify-between mt-[10px]">
          <div className="">
            <p className="text-[100%] font-[500] text-[#707070]">
              {new Date(seatMatrix.date).toLocaleDateString("en-IN", {
                weekday: "short"
              })}
            </p>
            <p className="mt-[-7px] text-[1.05rem] font-bold">
              {new Date(seatMatrix.date)
                .toLocaleDateString("en-IN", options)
                .slice(0, -1)}
            </p>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="font-[500] text-[85%] flex items-center gap-[5px]">
              <div className="h-[18px] w-[18px] rounded-[2px] border border-black"></div>
              <p>Available</p>
            </div>
            <div className="font-[500] text-[85%] flex items-center gap-[5px]">
              <div className="bg-[#bbbbbb] h-[18px] w-[18px] rounded-[2px] border border-transparent"></div>
              <p>Booked</p>
            </div>
            <div className="font-[500] text-[85%] flex items-center gap-[5px]">
              <div className="bg-black h-[18px] w-[18px] rounded-[2px] border border-black"></div>
              <p>Selected</p>
            </div>
          </div>
        </div>

        {/* Seat Matrix */}
        <div className=" w-full flex-1"></div>
      </div>
    )
  );
}

export default SeatMatrix;
