import React, { useState } from "react";

const categories = ["Diamond", "Silver", "Gold"];

function ScreenCard({ screen }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [gaps, setGaps] = useState("");

  const handleUpdate = () => {
    // Logic to update the category details
    console.log({ selectedCategory, price, seatsPerRow, gaps });
  };

  return (
    <div className="px-[20px] border-y border-[#ffffff24] py-[10px]">
      <div className="text-[16px] font-[500] mb-[5px]">
        <p>{screen.screenName}</p>
      </div>
      <div className="flex gap-[1rem]">
        {/* left */}
        <div className="border border-white h-[300px] w-[50%] rounded-[10px]"></div>
        {/* right */}
        <div className="items-center w-[50%] flex-col flex justify-center">
          <div className="flex gap-[10px] flex-col ">
            <div className="flex gap-[20px]">
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">
                  Select Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((category,index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Price:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="flex gap-[20px]">
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Seats per Row:</label>
                <input
                  type="number"
                  value={seatsPerRow}
                  onChange={(e) => setSeatsPerRow(e.target.value)}
                  placeholder="Enter Seats per Row"
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Gaps:</label>
                <input
                  type="number"
                  value={gaps}
                  onChange={(e) => setGaps(e.target.value)}
                  placeholder="Enter Gaps"
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="py-[5px] px-[20px] bg-[#ea3402] rounded-[7px]"
            >
              Update Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenCard;
