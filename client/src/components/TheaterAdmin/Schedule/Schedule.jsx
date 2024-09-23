import React, { useEffect, useRef, useState } from "react";
import useMovie from "../../../store/Movie";
import SearchMovieCard from "./SearchMovieCard";
import useTheaterAdmin from "../../../store/TheaterAdmin";
import { toast } from "react-toastify";

function Schedule() {
  // External hooks for fetching movies and available screens
  const { movieList, getMovies } = useMovie();
  const { availableScreens, getAvailableScreens, AddSchedule } =
    useTheaterAdmin();

  // State management
  const [allMovies, setAllMovies] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [toggleScreen, setToggleScreen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [language, setLanguage] = useState("");
  const [screenType, setScreenType] = useState("");

  // Refs for handling outside click
  const searchRef = useRef(null);
  const screenRef = useRef(null);

  // Fetch movies when the component mounts
  useEffect(() => {
    getMovies();
  }, [getMovies]);

  // Update allMovies when movieList or searchText changes
  useEffect(() => {
    if (searchText) {
      const filteredMovies = movieList.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setAllMovies(filteredMovies);
    } else {
      setAllMovies(movieList);
    }
  }, [searchText, movieList]);

  // Fetch available screens when scheduling data is set
  useEffect(() => {
    if (selectedMovie) {
      getAvailableScreens(startTime, endTime, date, screenType);
    }
  }, [
    selectedMovie,
    startTime,
    endTime,
    date,
    screenType,
    getAvailableScreens
  ]);

  // Automatically calculate and set the end time based on the selected movie's duration
  useEffect(() => {
    if (selectedMovie && startTime) {
      const startDate = new Date(`1970-01-01T${startTime}:00`);
      const endDate = new Date(
        startDate.getTime() + selectedMovie.duration * 60000
      );
      setEndTime(endDate.toTimeString().slice(0, 5));
    }
  }, [selectedMovie, startTime]);

  // Handle outside clicks for search toggle
  useEffect(() => {
    const handleClickOutsideSearch = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setToggleSearch(false);
      }
    };
    window.addEventListener("click", handleClickOutsideSearch);
    return () => {
      window.removeEventListener("click", handleClickOutsideSearch);
    };
  }, []);

  // Handle outside clicks for screen toggle
  useEffect(() => {
    const handleClickOutsideScreen = (e) => {
      if (screenRef.current && !screenRef.current.contains(e.target)) {
        setToggleScreen(false);
      }
    };
    window.addEventListener("click", handleClickOutsideScreen);
    return () => {
      window.removeEventListener("click", handleClickOutsideScreen);
    };
  }, []);

  // Utility function to format minutes to hours and minutes
  const formatMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  };

  async function handleAddSchedule() {
    if (
      !selectedMovie ||
      !startTime ||
      !endTime ||
      !date ||
      !screenType ||
      !language ||
      !selectedScreen
    ) {
      toast.warn("Fill all the fields");
      return;
    }
    const scheduleData = {
      selectedMovie,
      startTime,
      endTime,
      date,
      screenType,
      language,
      selectedScreen
    };
    try {
      await AddSchedule(scheduleData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full w-full p-[10px]">
      {/* Top section  */}
      <div className="text-white flex items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-transparent">
        {/* movie selection */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Select Movie:
          </label>
          <div ref={searchRef} className="relative">
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
                            setSearchText("");
                            setScreenType(
                              (movie.screenType &&
                                movie.screenType.length > 0 &&
                                movie.screenType[0]) ||
                                []
                            );
                            setLanguage(
                              (movie.language &&
                                movie.language.length > 0 &&
                                movie.language[0]) ||
                                []
                            );
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
            onChange={(e) => setDate(e.target.value)}
            value={date}
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
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
            type="time"
            className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>

        {/* end time  */}
        <div className="pointer-events-none flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            End time:
          </label>
          <input
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
            readOnly={true}
            type="time"
            className="opacity-[.5]  px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>

        {/* duration  */}
        <div className="pointer-events-none flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            Duration:
          </label>
          <input
            value={
              selectedMovie !== ""
                ? formatMinutesToHours(selectedMovie.duration)
                : "0hr 00m"
            }
            readOnly={true}
            type="text"
            className="opacity-[.5] w-[90px]  px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
          />
        </div>

        {/* language */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Language:
          </label>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            disabled={selectedMovie === ""}
            className="w-[120px] px-3 py-2 bg-[#302f2f] rounded-lg outline-none "
          >
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

        {/* screen type */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Screen type:
          </label>
          <select
            onChange={(e) => setScreenType(e.target.value)}
            disabled={selectedMovie === ""}
            className="w-[120px] px-3 py-2 bg-[#302f2f] rounded-lg outline-none "
          >
            {selectedMovie &&
              selectedMovie.screenType.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
          </select>
        </div>

        {/* available screens */}
        <div className="flex flex-col">
          <label htmlFor="screenType" className="text-sm font-bold mb-1">
            Screens:
          </label>
          <div ref={screenRef} className="relative">
            <input
              onClick={() => {
                setToggleScreen(!toggleScreen);
              }}
              value={
                selectedScreen !== ""
                  ? `${selectedScreen.screenName} - ${selectedScreen.screenType}`
                  : ""
              }
              type="text"
              placeholder="Select screen"
              readOnly={true}
              className="cursor-pointer w-[150px]  px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            />
            {toggleScreen && (
              <div className="w-[150px] absolute top-[110%] rounded-[7px] bg-[#302f2f]">
                {availableScreens.length === 0 ? (
                  <div
                    onClick={() => {
                      setToggleScreen(false);
                    }}
                    className="text-center py-[1rem]"
                  >
                    Not available
                  </div>
                ) : (
                  availableScreens.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          setSelectedScreen(item);
                          setToggleScreen(false);
                        }}
                        style={{
                          opacity: item.isAvailable ? 1 : 0.3,
                          pointerEvents: item.isAvailable ? "auto" : "none"
                        }}
                        key={index}
                        className="p-[10px] hover:bg-[#444242] cursor-pointer overflow-hidden"
                      >
                        {item.screenType} - {item.screenName}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="screenName" className="text-sm font-bold mb-1">
            &nbsp;
          </label>
          <button
            onClick={handleAddSchedule}
            className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
