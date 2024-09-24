import React, { useEffect } from "react";

function ShowTimeCard({ show }) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return (
    <div className="border border-[#0000002d] px-[15px] py-[7px] rounded-[5px]">
      <p
        className={`font-[500] text-center  ${
          show.availableSeats < show.totalSeats / 2
            ? "text-[#c4056b]"
            : "text-[#28c405]"
        }`}
      >
        {new Date(show.startTime).toLocaleTimeString(undefined, options)}
      </p>
      <p className="text-[70%] text-center">
        Available <span>{show.availableSeats}</span>
      </p>
    </div>
  );
}

export default ShowTimeCard;
