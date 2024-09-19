import React from "react";

function AddMovie() {
  return (
    <div className="h-full w-full p-[1rem]">
      <div className="">
        <div className="flex gap-[10px] items-center">
          <label htmlFor="movietitle" className="font-[500]">
            Movie title
          </label>
          <input
            type="text"
            placeholder="Enter movie title"
            id="movietitle"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
          />
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default AddMovie;
