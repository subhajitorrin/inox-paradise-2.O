import React from "react";

function AddTheater() {
  return (
    <div className="h-full flex">
      <div className="h-full border-r p-[20px] ">
        <form className="w-[350px] gap-[20px] py-[1.5rem] p-[20px] rounded-[10px] bg-[#353333] flex justify-center items-center flex-col">
          <h2 className="text-[20px] font-[500] text-center mb-[.5rem]">
            Add new theater
          </h2>
          <div className="flex gap-[10px] text-[14px] items-center justify-between w-full ">
            <label htmlFor="theatername" className=" font-[500]">
              Theater name
            </label>
            <input
              type="text"
              placeholder="Theater name"
              id="theatername"
              required
              className="bg-[#2a2828] w-[200px] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          <div className="flex text-[14px] gap-[10px] items-center justify-between w-full">
            <label htmlFor="theateraddress" className=" font-[500]">
              Address
            </label>
            <textarea
              type="text"
              placeholder="Theater address"
              id="theateraddress"
              required
              rows={3}
              className="bg-[#2a2828] resize-none w-[200px] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          <div className="flex gap-[10px] text-[14px] items-center justify-between w-full">
            <label htmlFor="adminemail" className=" font-[500]">
              Admin email
            </label>
            <input
              type="text"
              placeholder="Admin email"
              id="adminemail"
              required
              className="bg-[#2a2828] py-[5px] w-[200px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>

          <div className="flex text-[14px] gap-[10px] items-center justify-between w-full">
            <label htmlFor="adminpassword" className="font-[500]">
              Password
            </label>
            <input
              type="text"
              placeholder="Admin password"
              id="adminpassword"
              required
              className="bg-[#2a2828] py-[5px] w-[200px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>

          <button className="font-[500] w-full bg-[green] rounded-[5px] py-[5px]">
            Add Theater
          </button>
        </form>
      </div>
      <div className="h-full"></div>
    </div>
  );
}

export default AddTheater;
