import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import useMovie from "../store/Movie";
import Navbar from "../components/Navbar/Navbar";
import { MdOutlineStarPurple500 } from "react-icons/md";
import MovieRows from "../components/Home/MovieRows";

function movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setmovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getMovieById } = useMovie();

  const { newReleaseMovieList, getNewReleaseMovies } = useMovie();
  useEffect(() => {
    getNewReleaseMovies();
  }, []);

  useEffect(() => {
    async function handleGetMovieById() {
      const movie = await getMovieById(id);
      console.log(movie);
      setmovieDetail(movie);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    if (id) handleGetMovieById();
  }, [id]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0
    }
  };

  function getYouTubeId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    <>
      <Navbar />
      {movie && (
        <>
          <div className="px-[10%] w-full flex gap-[20px]">
            {/* left */}
            <div className=" h-full flex flex-col  gap-[5px] w-[320px]">
              <img
                src={movie.poster}
                className="h-[66vh] w-[21vw] object-cover rounded-[10px]"
              />
              <p className="text-[18px] font-bold">{movie.title}</p>
              <div className="items-center font-[500] flex gap-[5px] text-[85%]">
                <p className="">{formatMinutesToHours(movie.duration)}</p>•
                <p className="">{movie.releaseDate.slice(0, 10)}</p>•
                <div className="flex items-center gap-[2px]">
                  <MdOutlineStarPurple500 className="text-[20px] text-[#F84464]" />
                  <p className="">{movie.rating}/10</p>
                </div>
              </div>
              <div className="text-[85%] font-[500] flex gap-[10px]">
                {movie.language.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
              <div className="text-[85%] font-[500] flex gap-[10px]">
                {movie.genre.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="bg-[#dddddd] py-[2px] px-[7px] rounded-[5px] text-[85%]"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
              <div className="w-[320px] mt-[10px]">
                <p className="font-[500] text-[87%]">About the movie</p>
                <p className=" text-[85%]">{movie.synopsis}</p>
              </div>
            </div>

            {/* right */}
            <div className=" flex-1 h-full ">
              <div className="rounded-[10px] overflow-hidden h-[55vh]">
                {isLoading && <div className="h-[420px]"></div>}
                <YouTube
                  videoId={getYouTubeId(movie.trailerUrl)}
                  opts={opts}
                  onReady={() => setIsLoading(false)}
                  style={{
                    height: "100%"
                  }}
                  className={isLoading ? "hidden" : "block"}
                />
              </div>
              <div className="my-[10px] flex justify-center w-full flex-col items-center gap-[5px]">
                <button
                  className="bg-[#da4b63] text-[86%] text-white hover:bg-[#b94155] transition-all duration-200 ease-linear  font-[500] w-[60%] cursor-pointer py-[7px] rounded-[5px]"
                  onClick={() => {
                    navigate(`/timings/${id}`);
                  }}
                >
                  Book Ticket
                </button>
                <p className="font-[600] text-[85%]">
                  *Get ready to secure your spot! Check timings now.
                </p>
              </div>
              <div className="border-t border-[#0000002a]"></div>
              <div className="px-[5%] my-[10px]">
                <h2 className="font-[600] text-[110%] mb-[10px]">Starring</h2>
                <div className="flex gap-[20px] items-center">
                  {movie.castList.map((item, index) => {
                    return (
                      <div className="flex flex-col gap-[5px]" key={index}>
                        <div className="h-[100px] w-[100px] rounded-[50%] overflow-hidden">
                          <img
                            src={item.profile}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="font-[500] text-[85%] text-center">
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <MovieRows title={"New Releases"} list={newReleaseMovieList} />
        </>
      )}
    </>
  );
}

export default movie;
