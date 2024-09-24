import React, { useEffect, useState } from "react";
import ViewSeatMatrix from "../Screen/ViewSeatMatrix";
import SeatMatrix from "./SeatMatrix";

function ScheduleCard({ schedule }) {
  const {
    movie,
    date,
    startTime,
    endTime,
    availableSeats,
    totalSeats,
    language,
    screenType,
    bookedCount
  } = schedule;

  const [status, setStatus] = useState("");

  useEffect(() => {
    const today = new Date();
    if (new Date(startTime) <= today && new Date(endTime) >= today) {
      setStatus("Now Showing");
    } else if (new Date(endTime) < today) {
      setStatus("Finished Showing");
    } else {
      setStatus("Upcoming");
    }
  }, [date, startTime, endTime]);

  const options = { hour: "numeric", minute: "numeric", hour12: true }; // Modify this for 24-hour format if needed

  return (
    <div className="bg-[#292727] text-white w-full gap-[10px] p-4 rounded-lg shadow-md mb-4 flex">
      {/* Movie Poster */}
      <div className="flex flex-col gap-[10px] w-[30%]">
        <div className="flex">
          <img
            src={movie?.poster || ""}
            alt={movie?.title || "Unknown Title"}
            className="h-[300px] w-[200px] object-cover rounded-[5px] mr-[10px]"
          />
          <div className="flex-grow text-[90%]">
            <h3 className="text-[1.1rem] font-semibold mb-[20px]">
              {movie?.title || "Unknown Title"}
            </h3>
            <p className="mb-1">Date: {new Date(date).toLocaleDateString()}</p>
            <p className="mb-1">
              <span className="">Start Time:</span>{" "}
              {new Date(startTime).toLocaleTimeString(undefined, options)}
            </p>
            <p className="mb-1">
              <span className="m">End Time:</span>{" "}
              {new Date(endTime).toLocaleTimeString(undefined, options)}
            </p>

            <p className="mb-1">Language: {language}</p>
            <p className="mb-1">Screen Type: {screenType}</p>
            <p className="mb-1">Seat capacity: {totalSeats}</p>
            <p className="mb-1 text-center font-[500] text-[.9rem] uppercase mt-[10px] opacity-[.7]">
              {status}
            </p>
          </div>
        </div>
        <div className="font-[500] text-[1.1rem] mt-[10px] border border-[#ffffff42]  rounded-[5px] py-[5px] px-[10px]">
          <div className="flex justify-between text-[#FFA500]">
            {" "}
            {/* Orange for Total Bookings */}
            <p className="mb-1">Total Bookings: {bookedCount}</p>
            <p className="mb-1 text-[#32CD32]">
              {" "}
              {/* Lime Green for Total Revenue */}
              Total Revenue: <span>₹0</span>
            </p>
          </div>
          <div className="flex justify-end text-[#FFD700]">
            {" "}
            {/* Gold for Available Seats */}
            <p className="mb-1 ">
              Available Seats: {availableSeats} / {totalSeats}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[70%] border border-[#ffffff42] rounded-[5px] overflow-hidden">
        <SeatMatrix screen={schedule.screen} isLoading={false} />
      </div>
    </div>
  );
}

export default ScheduleCard;
