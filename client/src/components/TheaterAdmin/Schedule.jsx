import React, { useEffect } from "react";
import useMovie from "../../store/Movie";
import { MdOutlineStarPurple500 } from "react-icons/md";

// movie startTime language screenType

function Schedule() {
  const { movieList, getMovies } = useMovie();

  useEffect(() => {
    getMovies();
  }, []);

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    <div className="h-full w-full p-[10px]">
      {/* Top section  */}
      <div className="text-white flex items-center space-x-4 p-4 border border-[#ffffff2d] rounded-lg bg-transparent">
        {/* movie selection */}
        <div className="flex gap-[20px] items-center">
          {/* <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              Screen Name:
            </label>
            <input
              type="text"
              id="screenName"
              name="screenName"
              placeholder="Enter Screen Name"
              className="px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
            />
          </div> */}

          <div className="flex flex-col">
            <label htmlFor="screenType" className="text-sm font-bold mb-1">
              Select Movie:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Movie"
                readOnly={true}
                className="cursor-pointer scrollNone px-3 py-2 bg-[#302f2f] rounded-lg outline-none"
              ></input>
              {/* dropdown */}
              <div className="overflow-y-auto scrollNone max-h-[500px] bg-[#302f2f] absolute w-[300px] top-[110%] rounded-[10px]">
                <div className="bg-[#302f2f] sticky top-0 w-full p-[10px]">
                  <input
                    type="text"
                    placeholder="Select Movie"
                    className="w-[100%]  py-[5px] outline-none px-[20px] rounded-[7px] bg-transparent bg-[#424141]"
                  />
                </div>
                <div className=" flex flex-col gap-[10px]">
                  {movieList &&
                    movieList.map((movie, index) => {
                      return (
                        <div
                          className="hover:bg-[#444242] border-y border-[#ffffff1d] p-[7px] cursor-pointer flex gap-[10px] rounded-[7px]"
                          key={index}
                        >
                          <img
                            src={movie.poster}
                            className="h-[150px] w-[100px] object-cover"
                          />
                          <div className="flex flex-col text-[85%] ">
                            <p className="font-[500] mb-[10px]">
                              {movie.title}
                            </p>
                            <p className="text-[85%] ">
                              {formatMinutesToHours(movie.duration)}
                            </p>
                            <div className="flex items-center gap-[2px]">
                              <p className="text-[85%]">{movie.rating}/10</p>
                              <MdOutlineStarPurple500 className=" text-[#F84464]" />
                            </div>
                            <div className="text-[85%] font-[500] flex gap-[10px] mb-[3px]">
                              {movie.language.map((item, index) => {
                                return <p key={index}>{item},</p>;
                              })}
                            </div>
                            <div className="text-[85%] font-[500] flex gap-[5px]">
                              {movie.genre.map((item, index) => {
                                return (
                                  <p
                                    key={index}
                                    className=" text-[85%] border border-[#ffffff2d] rounded-[3px] px-[3px] py-[1px]"
                                  >
                                    {item}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="screenName" className="text-sm font-bold mb-1">
              &nbsp;
            </label>
            <button className="bg-[#FF0051] text-white px-[20px] py-2 rounded-lg hover:bg-[#cf0142]">
              Add Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
