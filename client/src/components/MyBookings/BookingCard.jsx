import { Calendar, Clock, Film, MapPin, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const demoBookings = [
  {
    movieTitle: "Inception",
    date: "2024-10-05",
    time: "19:30",
    theater: "Cinema Hall 1",
    screen: "Screen 3",
    seats: ["A1", "A2", "A3"],
    posterUrl:
      "https://images.mid-day.com/images/images/2023/may/bloddydaddmainposter_d.jpg"
  },
  {
    movieTitle: "The Dark Knight",
    date: "2024-10-06",
    time: "21:00",
    theater: "Cinema Hall 2",
    screen: "Screen 1",
    seats: ["B1", "B2"],
    posterUrl:
      "https://assets.gadgets360cdn.com/pricee/assets/product/202402/Vedda_Poster_1_1707381080.jpg"
  },
  {
    movieTitle: "Interstellar",
    date: "2024-10-07",
    time: "17:00",
    theater: "Cinema Hall 3",
    screen: "Screen 2",
    seats: ["C1", "C2", "C3", "C4"],
    posterUrl:
      "https://cdn.marvel.com/content/1x/antmanandthewaspquantumania_lob_crd_03.jpg"
  },
  {
    movieTitle: "Tenet",
    date: "2024-10-08",
    time: "20:00",
    theater: "Cinema Hall 4",
    screen: "Screen 4",
    seats: ["D1", "D2"],
    posterUrl:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00401441-jhkvdzzhks-portrait.jpg"
  }
];

export default function BookingCard({ bookings = demoBookings }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="relative p-0">
            <img
              alt={`Poster for ${booking.movieTitle}`}
              className="w-full h-72 object-cover" // Adjusted height for vertical posters
              height="300"
              src={booking.posterUrl || `/placeholder.svg?height=300&width=200`}
              style={{
                aspectRatio: "200/300", // Aspect ratio adjusted for vertical posters
                objectFit: "cover"
              }}
              width="200" // Adjusted width for vertical posters
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <CardTitle className="text-white text-lg">
                {booking.movieTitle}
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
              <span className="text-sm">{booking.theater}</span>
            </div>
            <div className="flex items-center">
              <Film className="mr-2 h-4 w-4" />
              <span className="text-sm">{booking.screen}</span>
            </div>
            <div className="flex items-center">
              <Ticket className="mr-2 h-4 w-4" />
              <span className="text-sm">{booking.seats.join(", ")}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex gap-[10px]">
            <Button className="w-full">Get E-Ticket</Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Cancel Booking
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
