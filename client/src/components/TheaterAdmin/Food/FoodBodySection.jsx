import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useTheaterAdmin from "@/store/TheaterAdmin";

const foodItems = [
  {
    name: "Pizza",
    image:
      "https://imgmedia.lbb.in/media/2019/07/5d242ad8e93a896e5542da0d_1562651352251.jpg",
    price: 9.99
  },
  {
    name: "Burger",
    image:
      "https://imgmedia.lbb.in/media/2019/07/5d242ad8e93a896e5542da0d_1562651352251.jpg",
    price: 5.99
  },
  {
    name: "Sushi",
    image:
      "https://imgmedia.lbb.in/media/2019/07/5d242ad8e93a896e5542da0d_1562651352251.jpg",
    price: 14.99
  },
  {
    name: "Pasta",
    image:
      "https://imgmedia.lbb.in/media/2019/07/5d242ad8e93a896e5542da0d_1562651352251.jpg",
    price: 7.99
  },
  {
    name: "Salad",
    image:
      "https://imgmedia.lbb.in/media/2019/07/5d242ad8e93a896e5542da0d_1562651352251.jpg",
    price: 4.99
  }
];

function FoodBodySection() {
  const { getAllFoods, foods } = useTheaterAdmin();

  useEffect(() => {
    getAllFoods();
  }, []);

  const handleUpdate = (itemName) => {
    console.log(`Update ${itemName}`); // Implement your update logic here
  };

  const handleDelete = (itemName) => {
    console.log(`Delete ${itemName}`); // Implement your delete logic here
  };

  return (
    <div className="w-full text-white scrollNone">
      <div className="flex flex-col gap-[10px]">
        {foods.map((item, index) => (
          <Card
            key={index}
            className="bg-[#292727] flex items-center hover:bg-[#3e3c3c] text-white p-4 border-none cursor-pointer transition-all ease-linear duration-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[100px] w-[100px] rounded-[5px] mr-4"
            />
            <div className="flex flex-col flex-grow">
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>${item.price.toFixed(2)}</CardDescription>
            </div>
            <div className="flex gap-[10px]">
              <Button variant="secondary">Update</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FoodBodySection;
