import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import useTheaterAdmin from "@/store/TheaterAdmin";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function TopSection() {
  const { addFood } = useTheaterAdmin();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFood = async () => {
    if (!name || !image || !price) {
      toast.warn("Fill all the fields");
      return;
    }
    const foodData = { name, image, price: parseFloat(price) };
    try {
      setIsLoading(true);
      await addFood(foodData);
      setName("");
      setImage("");
      setPrice("");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white flex z-[10] justify-between items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-[#1E1D1D]">
      <div className="flex items-center gap-[10px]">
        <div className="grid max-w-sm items-center gap-1.5 w-[400px]">
          <Label>Food image</Label>
          <input
            disabled={isLoading}
            type="text"
            placeholder="Paste food image url"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="grid max-w-sm items-center gap-1.5 w-[200px]">
          <Label>Food Name</Label>
          <input
            disabled={isLoading}
            type="text"
            placeholder="Enter food name"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-[200px] max-w-sm items-center gap-1.5">
          <Label>Food Price</Label>
          <input
            disabled={isLoading}
            type="number"
            placeholder="Enter food price"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="screenName" className="text-sm font-bold mb-1">
          &nbsp;
        </label>
        <button
          disabled={isLoading}
          className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]"
          onClick={handleAddFood}
        >
          {isLoading ? <BeatLoader color="#ffffff" size={5} /> : "Add food"}
        </button>
      </div>
    </div>
  );
}

export default TopSection;
