import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import useTheaterAdmin from "@/store/TheaterAdmin";
import { toast } from "react-toastify";
import UpdateCard from "./UpdateCard";
import { DeleteCard } from "./DeleteCard";

function FoodBodySection() {
  const { getAllFoods, foods } = useTheaterAdmin();
  const [update, setUpdate] = useState(null);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [delData, setDelData] = useState(false);

  useEffect(() => {
    getAllFoods();
  }, []);

  return (
    <div className="w-full text-white scrollNone">
      <UpdateCard
        open={open}
        onOpenChange={setOpen}
        update={update}
        setUpdate={setUpdate}
      />
      <DeleteCard
        delOpen={delOpen}
        setDelOpen={setDelOpen}
        delData={delData}
        setDelData={setDelData}
      />
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
              <CardDescription className="text-[#989898] mt-[5px]">
                ₹{item.price.toFixed(2)}
              </CardDescription>
            </div>
            <div className="flex gap-[10px]">
              <Button
                variant="secondary"
                onClick={() => {
                  setUpdate(item);
                  setOpen(true);
                }}
              >
                Update
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setDelData(item);
                  setDelOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FoodBodySection;
