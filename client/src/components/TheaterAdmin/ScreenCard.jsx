import React, { useEffect, useRef, useState } from "react";
import useTheaterAdmin from "../../store/TheaterAdmin";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";

function ScreenCard({ screen }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [gaps, setGaps] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScreenName, setEditedScreenName] = useState(screen.screenName);
  const inputRef = useRef(null);

  const { screens } = useTheaterAdmin();

  useEffect(() => {
    const filteredCategories = screens.find((item) => item._id === screen._id);
    setCategories(filteredCategories.category);
  }, [screens, screen._id]);

  async function handleOnBlurScreenUpdate() {
    if (editedScreenName === "") {
      toast.warn("Screen name cannot be empty");
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      return;
    }
    setIsEditing(false);
  }

  return (
    <div className=" px-[20px] border-y border-[#ffffff24] py-[10px]">
      <div className="items-center flex text-[16px] font-[500] mb-[5px] gap-[10px]">
        <CiEdit
          className="text-[25px] cursor-pointer"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current.focus();
            }, 0);
          }}
        />
        <input
          type="text"
          style={{ border: isEditing ? "1px solid #ffffff4d" : "" }}
          className="text-white w-[150px] select-none border border-transparent rounded-[5px] bg-transparent px-[20px] py-[5px] outline-none"
          value={editedScreenName}
          onChange={(e) => setEditedScreenName(e.target.value)}
          disabled={!isEditing}
          onBlur={handleOnBlurScreenUpdate}
          ref={inputRef}
        />
      </div>
      <div className="flex gap-[1rem]">
        {/* left */}
        <div className="border border-white h-[300px] w-[50%] rounded-[10px]"></div>
        {/* right */}
        <div className="items-center w-[50%] flex-col flex justify-center">
          <div className="flex gap-[10px] flex-col">
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
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
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
