import BookingCard from "@/components/MyBookings/BookingCard";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

function MyBookings() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <h2 className="text-center font-[500] text-[85%]">
          *Here are your bookings
        </h2>
        <div className="">
          <BookingCard />
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
