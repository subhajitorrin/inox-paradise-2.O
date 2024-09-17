import React from "react";

function AddTheater() {
  return (
    <div className="h-full flex">
      <div className="h-full w-[30%] border-r p-[10px]">
        <form className="gap-[20px] py-[3%] px-[10px] rounded-[10px] bg-[#353333] flex justify-center items-center flex-col">
          <h2 className="text-[20px] font-[500] text-center mb-[.5rem]">
            Add new theater
          </h2>
          <div className="flex gap-[10px] items-center justify-between w-full ">
            <label htmlFor="theatername" className="text-[14px] font-[500]">
              Theater name
            </label>
            <input
              type="text"
              placeholder="Theater name"
              id="theatername"
              required
              className="bg-[#2a2828] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          <div className="flex gap-[10px] items-center justify-between w-full">
            <label htmlFor="adminemail" className="text-[14px] font-[500]">
              Admin email
            </label>
            <input
              type="text"
              placeholder="Admin email"
              id="adminemail"
              required
              className="bg-[#2a2828] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>

          <button className="font-[500] w-full bg-[green] rounded-[5px] py-[5px]">
            Add Theater
          </button>
        </form>
      </div>
      <div className="h-full w-[70%]"></div>
    </div>
  );
}

export default AddTheater;
