import React from "react";

function CastCard() {
  return (
    <div className="flex gap-[1rem] flex-col border-y py-[20px] border-[#353333]">
      <div className="flex gap-[10px] items-center">
        <label htmlFor="movietitle" className="font-[500] w-[100px]">
          Cast name
        </label>
        <input
          type="text"
          placeholder="Enter cast name"
          id="movietitle"
          className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
        />
      </div>
      <div className="flex gap-[10px] items-center">
        <label htmlFor="movietitle" className="font-[500] w-[100px]">
          Photo
        </label>
        <input
          type="text"
          placeholder="Paste caste photo url"
          id="movietitle"
          className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
        />
      </div>
    </div>
  );
}

export default CastCard;
