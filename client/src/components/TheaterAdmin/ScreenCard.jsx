import React, { useEffect, useRef, useState } from "react";
import useTheaterAdmin from "../../store/TheaterAdmin";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import ViewSeatMatrix from "./ViewSeatMatrix";
import { BeatLoader } from "react-spinners";

function ScreenCard({ screen, setRefetch }) {
  const [categoryState, setCategoryState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [noOfRows, setNoOfRows] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [gaps, setGaps] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScreenName, setEditedScreenName] = useState(screen.screenName);
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const editbtnRef = useRef(null);
  const [editedScreenType, setEditedScreenType] = useState(screen.screenType);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);

  const {
    screens,
    updateScreen,
    deleteScreen,
    updateCategory,
    deleteCategory
  } = useTheaterAdmin();

  useEffect(() => {
    setCategoryState(screen.category.length > 0);
  }, [screen]);

  useEffect(() => {
    const filteredCategories = screens.find((item) => item._id === screen._id);
    if (filteredCategories.category.length > 0) {
      setCategories(filteredCategories.category);
    } else {
      setCategories([]);
    }
  }, [screens, screen._id]);

  async function handleScreenUpdate(e) {
    if (editedScreenName === "") {
      toast.warn("Screen name cannot be empty");
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      return;
    }
    try {
      await updateScreen(screen._id, editedScreenName, editedScreenType);
      setRefetch((prev) => !prev);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (categories.length > 0) {
      if (!selectedCategory) {
        setSelectedCategory(categories[0]._id);
      }
      const filteredCategories = categories.find(
        (item) => item._id === selectedCategory
      );
      if (filteredCategories) {
        setNoOfRows(filteredCategories.rows);
        setPrice(filteredCategories.price);
        setSeatsPerRow(filteredCategories.seatsPerRow);
        setCategoryName(filteredCategories.name);
        setGaps(filteredCategories.gaps.join(",") || "");
      }
    }
  }, [selectedCategory, categories]);

  async function handleUpdateCategory() {
    if (selectedCategory === "") {
      toast.warn("Please select a category");
      return;
    }
    console.log(categoryName, noOfRows, price, seatsPerRow, gaps);

    if (
      categoryName === "" ||
      noOfRows === "" ||
      price === "" ||
      seatsPerRow === ""
    ) {
      toast.warn("Fields can't be empty");
      return;
    }
    setIsLoading1(true);
    try {
      await updateCategory(
        selectedCategory,
        categoryName,
        noOfRows,
        price,
        seatsPerRow,
        gaps
      );
      setRefetch((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading1(false);
    }
  }

  return (
    <div className="pb-[1rem] px-[20px] border-y border-[#ffffff24] py-[10px]">
      <div className="items-center flex text-[16px] font-[500] mb-[5px] gap-[10px]">
        <span
          ref={editbtnRef}
          disabled={isLoading1 || isLoading2 || isLoading3}
        >
          <CiEdit
            className="text-[25px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current.focus();
              }, 0);
            }}
          />
        </span>

        <input
          type="text"
          style={{ border: isEditing ? "1px solid #ffffff4d" : "" }}
          className="text-white w-[150px] select-none border border-transparent rounded-[5px] bg-transparent px-[20px] py-[5px] outline-none"
          value={editedScreenName}
          onChange={(e) => setEditedScreenName(e.target.value)}
          disabled={!isEditing || isLoading1 || isLoading2 || isLoading3}
          ref={inputRef}
        />
        <div className="" ref={selectRef}>
          <select
            disabled={!isEditing || isLoading1 || isLoading2 || isLoading3}
            id="screenType"
            name="screenType"
            onChange={(e) => {
              setEditedScreenType(e.target.value);
            }}
            value={editedScreenType}
            className={`px-3 py-2 ${
              isEditing ? "bg-[#302f2f]" : "bg-transparent"
            } rounded-lg outline-none `}
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
            <option value="4DX">4DX</option>
          </select>
        </div>

        <div
          className={`bg-[#1E1D1D] pointer-events-none h-[20px] w-[20px] relative ${
            !isEditing ? "left-[-2.5%]" : "left-0"
          }`}
        ></div>

        {isEditing && (
          <button
            disabled={isLoading1 || isLoading2 || isLoading3}
            onClick={handleScreenUpdate}
            className="bg-[#ff0090] text-[.9rem] text-white px-[10px] py-2 rounded-lg hover:bg-[#cf0142]"
          >
            Update screen
          </button>
        )}
      </div>
      <div className="flex gap-[1rem] min-h-[88%]">
        {/* left */}
        <div className="border border-white min-h-full w-[65%] rounded-[10px]">
          <ViewSeatMatrix screen={screen} />
        </div>
        {/* right */}
        <div className="items-end w-[35%] flex-col flex ">
          <div
            style={{
              opacity:
                categoryState === null ? 0 : categoryState === true ? 1 : 0.3,
              pointerEvents:
                categoryState === null
                  ? "none"
                  : categoryState === true
                  ? "auto"
                  : "none"
            }}
            className="flex gap-[10px] flex-col"
          >
            <div className="flex gap-[20px]">
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">
                  *Select Category:
                </label>
                <select
                  disabled={isLoading1 || isLoading2 || isLoading3}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-[#484747] w-[200px] rounded-lg outline-none"
                >
                  {/* <option value="">Select a category</option> */}
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Category name:</label>
                <input
                  disabled={isLoading1 || isLoading2 || isLoading3}
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Update name"
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                />
              </div>
            </div>
            <div className="flex gap-[20px]">
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">
                  Number of rows:
                </label>
                <input
                  disabled={isLoading1 || isLoading2 || isLoading3}
                  type="number"
                  value={noOfRows}
                  onChange={(e) => setNoOfRows(e.target.value)}
                  placeholder="Enter number of rows"
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Price:</label>
                <input
                  disabled={isLoading1 || isLoading2 || isLoading3}
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
                  disabled={isLoading1 || isLoading2 || isLoading3}
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
                  disabled={isLoading1 || isLoading2 || isLoading3}
                  type="text"
                  value={gaps}
                  onChange={(e) => setGaps(e.target.value)}
                  placeholder="Enter Gaps"
                  className="px-3 py-2 bg-[#302f2f] w-[200px] rounded-lg outline-none"
                />
              </div>
            </div>

            <button
              disabled={isLoading1 || isLoading2 || isLoading3}
              onClick={handleUpdateCategory}
              className="py-[5px] px-[20px] bg-[#1d4ed8] text-white rounded-[7px] hover:bg-[#2563eb] transition-colors duration-300"
            >
              {isLoading1 ? (
                <BeatLoader color="#ffffff" size={5} />
              ) : (
                "Update Category"
              )}
            </button>
            <button
              disabled={isLoading1 || isLoading2 || isLoading3}
              onClick={async () => {
                await deleteCategory(selectedCategory);
                setRefetch((prev) => !prev);
              }}
              className="py-[5px] px-[20px] bg-[#e11d48] text-white rounded-[7px] hover:bg-[#be123c] transition-colors duration-300"
            >
              Delete Category
            </button>
          </div>

          <div
            style={{
              opacity:
                categoryState === null ? 0 : categoryState === false ? 1 : 0
            }}
            className="h-[100%] w-full mt-[10px]"
          >
            <p className="text-center font-[500]">
              *Create category to build seat matrix
            </p>
          </div>

          <div className="flex gap-[10px] flex-col w-[97.5%]">
            <button
              onClick={async () => {
                await deleteScreen(screen._id);
                setRefetch((prev) => !prev);
              }}
              disabled={isLoading1 || isLoading2 || isLoading3}
              className="py-[5px] mt-[1rem] px-[20px] bg-[#6b7280] text-white rounded-[7px] hover:bg-[#4b5563] transition-colors duration-300"
            >
              Delete Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenCard;
