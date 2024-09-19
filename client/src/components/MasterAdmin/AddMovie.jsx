import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import CastCard from "./CastCard";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Thriller",
  "Western",
  "Documentary"
];

const CBFClist = ["U", "UA", "A", "S"];

const languageList = [
  { name: "English" },
  { name: "Hindi" },
  { name: "Bangla" },
  { name: "Tamil" },
  { name: "Telegu" }
];

function AddMovie() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [castList, setCastList] = useState([]);

  const handleLanguageSelect = (selectedList, selectedItem) => {
    setSelectedLanguages(selectedList);
  };

  const handleLanguageRemove = (selectedList, removedItem) => {
    setSelectedLanguages(selectedList);
  };

  async function handleAddMovie() {}

  return (
    <div className="h-full w-full p-[1rem] flex justify-between">
      <div className="flex flex-col gap-[1rem] w-[50%] items-center">
        {/* title */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="movietitle" className="font-[500] w-[100px]">
            Movie Title
          </label>
          <input
            type="text"
            placeholder="Enter movie title"
            id="movietitle"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* genre */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="genre" className="font-[500] w-[100px]">
            Genre
          </label>
          <select
            id="genre"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          >
            <option value="">Select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* duration */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="duration" className="font-[500] w-[100px]">
            Duration
          </label>
          <input
            type="number"
            placeholder="Enter duration in minutes"
            id="duration"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* release date */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="releasedate" className="font-[500] w-[100px]">
            Release Date
          </label>
          <input
            type="date"
            id="releasedate"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* CBFC rating */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="CBFCrating" className="font-[500] w-[100px]">
            CBFC Rating
          </label>
          <select
            id="CBFCrating"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          >
            <option value="">Select CBFC Rating</option>
            {CBFClist.map((item) => (
              <option key={item} value={item.toLowerCase()}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* language */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="language" className="font-[500] w-[100px]">
            Language
          </label>
          <Multiselect
            options={languageList}
            displayValue="name"
            selectedValues={selectedLanguages}
            onSelect={handleLanguageSelect}
            onRemove={handleLanguageRemove}
            placeholder="Select languages"
            className="w-[400px] bg-[#353333]"
            style={{
              option: {
                color: "white"
              },
              optionContainer: {
                backgroundColor: "#353333"
              },
              searchBox: {
                border: "none",
                paddingLeft: "20px"
              },
              multiselectContainer: {
                width: "400px",
                borderRadius: "5px",
                fontSize: "14px",
                paddingTop: "5px",
                paddingBottom: "5px"
              }
            }}
          />
        </div>

        {/* poster */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="poster" className="font-[500] w-[100px]">
            Poster
          </label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* trailer url */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="movietitle" className="font-[500] w-[100px]">
            Trailer URL
          </label>
          <input
            type="text"
            placeholder="Enter trailer url"
            id="movietrailerurl"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* synopsis */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="synopsis" className="font-[500] w-[100px]">
            Synopsis
          </label>
          <textarea
            id="synopsis"
            placeholder="Enter synopsis of movie"
            style={{ resize: "none" }}
            rows={4}
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>
        <button
          onClick={handleAddMovie}
          className="text-[15px] font-[500] w-[85%] mx-[1rem] py-[5px] rounded-[5px] bg-[#03ab11]"
        >
          Add movie to database
        </button>
      </div>
      <div className="w-[50%] items-center flex flex-col gap-[1rem] h-full overflow-y-auto scrollNone">
        <p className="font-[500] text-center">Actors & Actresses </p>
        {castList.map((item, index) => {
          return <CastCard />;
        })}
        <div className="flex justify-center gap-[1rem]">
          <button
            onClick={() => {
              setCastList((prev) => [...prev, { name: "", photo: "" }]);
            }}
            className="text-[15px] font-[500] px-[20px] py-[5px] rounded-[5px] bg-[#d18c02]"
          >
            New Cast
          </button>
          {castList.length > 0 && (
            <button
              onClick={() => {
                setCastList((prev) => prev.slice(0, -1));
              }}
              className="text-[15px] font-[500] px-[20px] py-[5px] rounded-[5px] bg-[#d13d02]"
            >
              Remove Cast
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
