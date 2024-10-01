import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Film,
  MapPin,
  Ticket,
  Wallet 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import useUser from "@/store/User";
import { toast } from "react-toastify";

function CardContainer(booking) {
  console.log(booking.booking);

  const [isLoading, setIsLoading] = useState(false);
  const { cancelBooking, getMyBookings } = useUser();

  async function handleCancelBooking(id) {
    try {
      setIsLoading(true);
      await cancelBooking(id);
      await getMyBookings();
      toast.success("Booking cancelled successfully");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative p-0">
        <img
          alt={`Poster for ${booking.booking.movie.title}`}
          className="w-full h-72 object-cover"
          height="300"
          src={
            booking.booking.movie.poster ||
            `/placeholder.svg?height=300&width=200`
          }
          style={{
            aspectRatio: "200/300",
            objectFit: "cover"
          }}
          width="200"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <CardTitle className="text-white text-lg">
            {booking.booking.movie.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span className="text-sm">
            {new Date(booking.booking.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          <span className="text-sm">
            {new Date(booking.booking.time).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            })}
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span className="text-sm">{booking.booking.theater.name}</span>
        </div>
        <div className="flex items-center">
          <Film className="mr-2 h-4 w-4" />
          <span className="text-sm">{booking.booking.screen.screenName}</span>
        </div>
        <div className="flex items-center">
          <Ticket className="mr-2 h-4 w-4" />
          <span className="text-sm">
            {booking.booking.seats.map((seat, i) => {
              return <span key={i}>{seat.name}&nbsp;</span>;
            })}
          </span>
        </div>
        <div className="flex items-center">
          <Wallet  className="mr-2 h-4 w-4" />
          <span className="text-sm">{booking.booking.price}₹</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex gap-[10px]">
        <Button disabled={isLoading} className="w-full">
          Get E-Ticket
        </Button>

        {booking.booking.isUpcoming && (
          <Button
            disabled={isLoading || booking.booking.isCancelled}
            onClick={() => {
              handleCancelBooking(booking.booking._id);
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <BeatLoader color="#ffffff" size={5} />
            ) : booking.booking.isCancelled ? (
              "Cancelled"
            ) : (
              "Cancel Booking"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CardContainer;
