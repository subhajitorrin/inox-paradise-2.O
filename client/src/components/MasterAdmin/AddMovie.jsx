import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

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

  const handleLanguageSelect = (selectedList, selectedItem) => {
    setSelectedLanguages(selectedList);
  };

  const handleLanguageRemove = (selectedList, removedItem) => {
    setSelectedLanguages(selectedList);
  };

  return (
    <div className="h-full w-full p-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        {/* title */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="movietitle" className="font-[500] w-[100px]">
            Movie Title
          </label>
          <input
            type="text"
            placeholder="Enter movie title"
            id="movietitle"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
          />
        </div>

        {/* genre */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="genre" className="font-[500] w-[100px]">
            Genre
          </label>
          <select
            id="genre"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
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
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
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
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
          />
        </div>

        {/* CBFC rating */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="CBFCrating" className="font-[500] w-[100px]">
            CBFC Rating
          </label>
          <select
            id="CBFCrating"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
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
                fontSize: "14px"
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
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
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
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[5px] w-[400px] text-[14px]"
          />
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
