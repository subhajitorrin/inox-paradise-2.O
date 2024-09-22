import React from "react";

function Seat({ seat }) {
  return (
    <div className="h-[20px] w-[20px] flex justify-center items-center  border border-[white] rounded-[2px]">
      <p className="text-[10px]">{seat.seatNumber}</p>
    </div>
  );
}

export default Seat;
