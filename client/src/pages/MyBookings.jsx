import BookingCard from "@/components/MyBookings/BookingCard";
import Navbar from "@/components/Navbar/Navbar";
import useUser from "@/store/User";
import React, { useEffect } from "react";

function MyBookings() {
  const { myBookings, getMyBookings } = useUser();

  useEffect(() => {
    getMyBookings();
  }, [getMyBookings]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 px-[10%] overflow-y-auto scrollNone">
        <h2 className="text-center font-[500] text-[85%]">
          *Here are your bookings
        </h2>
        {myBookings.length > 0 ? (
          myBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} /> // Assuming each booking has a unique id
          ))
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
