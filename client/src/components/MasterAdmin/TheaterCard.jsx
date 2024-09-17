import React from "react";

function TheaterCard({ item }) {
  return (
    <div className="bg-[#2b2a2a] rounded-[10px] p-[1rem] w-[250px] flex flex-col gap-[10px]">
      <h2>{item.name}</h2>
      <p>{item.address}</p>
      <p>{item.email}</p>
      <div className="flex gap-[10px] justify-center">
        <button className="text-[15px] font-[500] px-[20px] py-[2px] rounded-[5px] bg-[#d18c02]">
          Update
        </button>
        <button className="text-[15px] font-[500] px-[20px] py-[2px] rounded-[5px] bg-[#d10c02]">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TheaterCard;
