
import useUser from "@/store/User";
import { useState } from "react";

import CardContainer from "./Card";

export default function BookingCard({ myBookings }) {
  
  

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {myBookings.map((booking, index) => {
        return <CardContainer booking={booking} key={index} />;
      })}
    </div>
  );
}
