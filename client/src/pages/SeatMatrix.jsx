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
      <div className="h-screen w-full">
        {/* top section */}
        <div className="px-[5%] py-[15px] w-full bg-black flex justify-between items-center">
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBackOutline className=" text-[25px] text-white cursor-pointer" />
          </span>
          <div className="text-white">
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
      </div>
    )
  );
}

export default SeatMatrix;
