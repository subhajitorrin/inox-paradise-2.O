import Footer from "@/components/Footer/Footer";
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
        <h2 className="text-center font-[500] text-[85%] mb-[10px]">
          *Here are your bookings
        </h2>
        {myBookings.length > 0 ? (
          <BookingCard myBookings={myBookings} />
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyBookings;
