import React, { useEffect, useState } from "react";
import useMovie from "../../../store/Movie";

import SearchMovieCard from "./SearchMovieCard";

// language screenType

function Schedule() {
  const { movieList, getMovies } = useMovie();
  const [allMovies, setAllMovies] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (movieList) {
      setAllMovies(movieList);
    }
  }, [movieList]);

  useEffect(() => {
    if (movieList.length > 0 && searchText !== "") {
      const filteredMovies = movieList.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setAllMovies(filteredMovies);
    } else {
      setAllMovies(movieList);
    }
  }, [searchText, movieList]);

  return (
    <div className="h-full w-full p-[10px]">
      {/* Top section  */}
      <div className="text-white flex items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-transparent">
        {/* movie selection */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Select Movie:
          </label>
          <div className="relative">
            <input
              onClick={() => {
                setToggleSearch((prev) => !prev);
              }}
              value={selectedMovie.title}
              type="text"
              placeholder="Select Movie"
              readOnly={true}
              className="cursor-pointer scrollNone px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            ></input>
            {/* dropdown */}
            {toggleSearch && (
              <div className="overflow-y-auto scrollNone max-h-[500px] bg-[#302f2f] absolute w-[300px] top-[110%] rounded-[10px]">
                <div className="bg-[#302f2f] sticky top-0 w-full p-[10px]">
                  <input
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    value={searchText}
                    type="text"
                    placeholder="Select Movie"
                    className="w-[100%]  py-[5px] outline-none px-[20px] rounded-[7px] bg-transparent bg-[#424141]"
                  />
                </div>
                <div className=" flex flex-col gap-[10px]">
                  {allMovies &&
                    allMovies.map((movie, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            setSelectedMovie(movie);
                            setToggleSearch(false);
                          }}
                        >
                          <SearchMovieCard movie={movie} />
                        </span>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* date  */}
        <div className="flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            Select date:
          </label>
          <input
            type="date"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>

        {/* start time  */}
        <div className="flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            Start time:
          </label>
          <input
            type="time"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>

        {/* end time  */}
        <div className="pointer-events-none flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            end time:
          </label>
          <input
            readOnly={true}
            type="time"
            className="opacity-[.5]  px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>

        {/* language */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Language:
          </label>
          <select className="w-[120px] px-3 py-2 bg-[#302f2f] rounded-lg outline-none ">
            {selectedMovie &&
              selectedMovie.language.map((lang, index) => {
                return (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                );
              })}
          </select>
        </div>

        {/* screen */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Screen:
          </label>
          <select className="w-[120px] px-3 py-2 bg-[#302f2f] rounded-lg outline-none ">
            {selectedMovie &&
              selectedMovie.language.map((lang, index) => {
                return (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            &nbsp;
          </label>
          <button className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
