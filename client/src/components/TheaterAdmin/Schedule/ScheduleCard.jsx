import React from "react";

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

  const options = { hour: "numeric", minute: "numeric", hour12: true }; // Modify this for 24-hour format if needed

  return (
    <div className="bg-[#292727] text-white p-4 rounded-lg shadow-md mb-4 flex">
      {/* Movie Poster */}
      <img
        src={movie?.poster || ""}
        alt={movie?.title || "Unknown Title"}
        className="h-[150px] w-[100px] object-cover rounded-[5px] mr-[10px]"
      />
      <div className="flex-grow text-[90%]">
        <h3 className="text-lg font-semibold mb-2">
          Movie: {movie?.title || "Unknown Title"}
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
        <p className="mb-1">Total bookings: {bookedCount}</p>
        <p className="mb-1">
          Available Seats: {availableSeats} / {totalSeats}
        </p>
        <p className="mb-1">Language: {language}</p>
        <p className="mb-1">Screen Type: {screenType}</p>
      </div>
    </div>
  );
}

export default ScheduleCard;
