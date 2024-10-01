import { Calendar, Clock, Film, MapPin, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookingCard({ myBookings }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {myBookings.map((booking, index) => {
        console.log(booking);
        return (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="relative p-0">
              <img
                alt={`Poster for ${booking.movie.title}`}
                className="w-full h-72 object-cover" // Adjusted height for vertical posters
                height="300"
                src={
                  booking.movie.poster ||
                  `/placeholder.svg?height=300&width=200`
                }
                style={{
                  aspectRatio: "200/300", // Aspect ratio adjusted for vertical posters
                  objectFit: "cover"
                }}
                width="200" // Adjusted width for vertical posters
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <CardTitle className="text-white text-lg">
                  {booking.movie.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 p-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">{booking.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span className="text-sm">{booking.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span className="text-sm">{booking.theater.name}</span>
              </div>
              <div className="flex items-center">
                <Film className="mr-2 h-4 w-4" />
                <span className="text-sm">{booking.screen.screenName}</span>
              </div>
              <div className="flex items-center">
                <Ticket className="mr-2 h-4 w-4" />
                <span className="text-sm">
                  {booking.seats.map((seat, i) => {
                    return <span key={i}>{seat.name}&nbsp;</span>;
                  })}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 flex gap-[10px]">
              <Button className="w-full">Get E-Ticket</Button>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Cancel Booking
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
