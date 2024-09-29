import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useTheaterAdmin from "@/store/TheaterAdmin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

function FoodBodySection() {
  const { getAllFoods, foods, updateFood } = useTheaterAdmin();
  const [update, setUpdate] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (update !== null) {
      setName(update.name);
      setImage(update.image);
      setPrice(update.price);
    }
  }, [update]);

  useEffect(() => {
    getAllFoods();
  }, []);

  const handleUpdate = async () => {
    if (name === "" || image === "" || price === "") {
      toast.warn("Fill data");
      return;
    }
    try {
      setIsLoading(true);
      await updateFood(foodData);
      setUpdate(null);
      setIsLoading(false);
      setImage("");
      setName("");
      setPrice("");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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
              <CardDescription className="text-[#989898] mt-[5px]">
                ₹{item.price.toFixed(2)}
              </CardDescription>
            </div>
            <div className="flex gap-[10px]">
              <Dialog>
                <DialogTrigger>
                  <Button variant="secondary" onClick={() => setUpdate(item)}>
                    Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Food</DialogTitle>
                    <DialogDescription>
                      Make changes to your food here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className=" items-center gap-4 flex justify-center">
                      <img
                        src={image}
                        alt=""
                        className="h-[200px] w-[200px] rounded-[5px] object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Image</Label>
                      <Input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Name</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))} // Update state on change
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleUpdate}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => handleDelete(item)}>
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
