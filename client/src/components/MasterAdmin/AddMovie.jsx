import React from "react";

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

function AddMovie() {
  return (
    <div className="h-full w-full p-[1rem]">
      <div className="">
        {/* title */}
        <div className="flex gap-[10px] items-center mb-[1rem]">
          <label htmlFor="movietitle" className="font-[500]">
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
        <div className="flex gap-[10px] items-center mb-[1rem]">
          <label htmlFor="genre" className="font-[500]">
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
      </div>
    </div>
  );
}

export default AddMovie;
