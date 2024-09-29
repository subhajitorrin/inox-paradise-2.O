import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import useTheaterAdmin from "@/store/TheaterAdmin";

function UpdateCard({ update, open, onOpenChange, setUpdate }) {
  const { updateFood } = useTheaterAdmin();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (update) {
      setName(update.name);
      setImage(update.image);
      setPrice(update.price);
    }
  }, [update]);

  const handleUpdate = async () => {
    if (name === "" || image === "" || price === "") {
      toast.warn("Fill data");
      return;
    }
    try {
      setIsLoading(true);
      await updateFood({ name, image, price }, update._id);
      onOpenChange(false);
      setUpdate(null);
      setIsLoading(false);
      setImage("");
      setName("");
      setPrice("");
    } catch (error) {
      toast.error("Failed to update food item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
          <DialogDescription>
            Make changes to your food here. Click save when you're done.
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
              disabled={isLoading}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input
              disabled={isLoading}
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
              disabled={isLoading}
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))} // Update state on change
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} type="button" onClick={handleUpdate}>
            {isLoading ? (
              <BeatLoader color="#ffffff" size={5} />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCard;
