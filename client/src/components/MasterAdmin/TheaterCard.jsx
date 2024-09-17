import React, { useState } from "react";
import useMasterAdmin from "../../store/MasterAdmin.js";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function TheaterCard({ item }) {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteTheater } = useMasterAdmin();
  async function handleDeleteTheater() {
    setIsLoading(true);
    try {
      await deleteTheater(item._id);
      toast.success("Theater deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="bg-[#2b2a2a] rounded-[10px] p-[1rem] w-[250px] flex flex-col gap-[10px]">
      <h2 className="text-[18px] font-[500] text-center">{item.name}</h2>
      <p>{item.address}</p>
      <p>{item.email}</p>
      <div className="flex gap-[10px] justify-center">
        <button className="text-[15px] font-[500] px-[20px] py-[2px] rounded-[5px] bg-[#d18c02]">
          Update
        </button>
        <button
          disabled={isLoading}
          onClick={handleDeleteTheater}
          className="text-[15px] font-[500] px-[20px] py-[2px] rounded-[5px] bg-[#d10c02]"
        >
          {isLoading ? <BeatLoader color="#ffffff" size={5} /> : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TheaterCard;
