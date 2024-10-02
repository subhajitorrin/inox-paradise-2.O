import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import useMovie from "../store/Movie";
import Navbar from "../components/Navbar/Navbar";
import { MdOutlineStarPurple500 } from "react-icons/md";
import MovieRows from "../components/Home/MovieRows";
import { useMobile } from "../store/ScreenWidth";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoShareSocial } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import ReviewCard from "@/components/Review/ReviewCard";
import { Plus } from "lucide-react";
import { ReviewContainer } from "@/components/Review/ReviewContainer";
import { WriteReview } from "@/components/Review/WriteReviewCard";
import useUser from "@/store/User";
import Footer from "@/components/Footer/Footer";

function movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [movie, setmovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getMovieById, getReviews, reviews, movie } = useMovie();
  const { isMobile } = useMobile();
  const [toggleReview, setToggleReview] = useState(false);
  const { user, setIsLogin } = useUser();

  useEffect(() => {
    getReviews(id);
  }, []);

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

  if (isMobile) {
    return (
      movie && (
        <div className="relative w-full">
          <div className="h-[60px] px-[3%] fixed top-0 w-full bg-white font-[500] text-[90%] flex justify-between items-center">
            <div className="flex items-center gap-[20px]">
              <IoChevronBackSharp
                onClick={() => {
                  navigate(-1);
                }}
                className="text-[22px]"
              />
              <p className="text-[1.3rem] font-[600]">{movie.title}</p>
            </div>
            <IoShareSocial className="text-[22px]" />
          </div>

          <div className="py-[15%]  px-[3%]">
            {/* trailer youtube */}
            <div className="rounded-[10px] z-[10] overflow-hidden relative h-[30vh]">
              {isLoading && (
                <div className="h-full w-full flex items-center justify-center">
                  <BeatLoader color="rgb(218,75,99)" size={7} />
                </div>
              )}
              <YouTube
                videoId={getYouTubeId(movie.trailerUrl)}
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: 0
                  }
                }}
                onReady={() => setIsLoading(false)}
                style={{
                  height: "100%",
                  bordeRadius: "10px"
                }}
                className={isLoading ? "hidden" : "block"}
              />
            </div>

            {/* rating */}
            <div className="bg-[#f1f4f9] mt-[1rem] py-[15px] px-[10px] w-full rounded-[10px] flex items-center justify-between">
              <div className="flex items-center gap-[5px] font-[500] 1.2rem">
                <MdOutlineStarPurple500 className="text-[23px] text-[#F84464]" />
                <p className="flex gap-[5px] items-center">
                  {movie.rating}/10{" "}
                  <span className="font-[400] text-[84%] flex items-center gap-[5px]">
                    (120 ratings) <FaChevronRight className="text-[80%]" />
                  </span>
                </p>
              </div>
              <div className="border border-[#F84464] rounded-[5px] py-[2px] px-[5px]">
                <p className="text-[#F84464] text-[82%] font-[500]">Rate now</p>
              </div>
            </div>

            {/* detail */}
            <div className="mt-[.5rem]">
              {/* languages */}
              <div className="flex items-center gap-[10px]">
                {movie.language.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="text-[80%] bg-[#e2e2e2] font-[500] px-[7px] py-[2px] rounded-[3px]"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
              {/* time genre cbfc releasedate */}
              <div className="font-[400] flex items-center gap-[5px] text-[82%] mt-[.5rem]">
                <p className="">{formatMinutesToHours(movie.duration)}</p>•
                <p>
                  {movie.genre.map((item, index) => {
                    if (index === movie.genre.length - 1)
                      return <span key={index}>{item}</span>;
                    else return <span key={index}>{item}, </span>;
                  })}
                </p>
                •<p className="uppercase ">{movie.CBFCrating}</p>•
                <p className="">{movie.releaseDate.slice(0, 10)}</p>
              </div>
              {/* synpsis */}
              <div className="w-[320px] mt-[10px]">
                <p className="font-[500] text-[87%]">About the movie</p>
                <p className=" text-[85%]">{movie.synopsis}</p>
              </div>
              {/* isTrending */}
              <div className="flex gap-[10px] items-center shadow-lg border border-[#00000022] px-[10px] py-[7px] rounded-[5px] mt-[10px]">
                <div className="text-[white] px-[10px] py-[3px] rounded-[5px] font-[500] text-[84%] flex items-center gap-[5px] bg-[#0076e8]">
                  <IoMdTrendingUp className="" />
                  <p>Trending</p>
                </div>
                <p className="text-[84%] font-[500]">
                  323 tickets booked in last 1 hour
                </p>
              </div>
              {/* review section */}
              <div className=""></div>
              {/* Cast section */}
              <div className="">
                <div className="flex gap-[20px] items-center mt-[1rem]">
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

          <div className="fixed w-full py-[20px] bottom-[0] h-[80px] flex items-center ">
            <div className="px-[3%] w-full">
              <button
                onClick={() => {
                  navigate(`/schedule/${id}`);
                }}
                className="w-full bg-[#F84464] text-[1.2rem] text-white py-[10px] rounded-[7px] font-[600]"
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      )
    );
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
                {isLoading && (
                  <div className="h-[420px] w-full flex items-center justify-center">
                    <BeatLoader color="rgb(218,75,99)" size={7} />
                  </div>
                )}
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
                    navigate(`/schedule/${id}`);
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

                {/* review section */}
                <div className="mt-[20px] w-full ">
                  <div className=" font-[500] flex justify-between items-center">
                    <h2 className="text-[110%]">Reviews</h2>{" "}
                    <span
                      onClick={() => {
                        if (user === null) {
                          setIsLogin(true);
                          return;
                        }
                        setToggleReview(true);
                      }}
                    >
                      <Plus className="text-[12px] cursor-pointer" />
                    </span>
                  </div>
                  <ReviewContainer reviews={reviews} />
                  <WriteReview
                    toggle={toggleReview}
                    setToggle={setToggleReview}
                    movieid={id}
                  />
                </div>
              </div>
            </div>
          </div>
          <MovieRows title={"New Releases"} list={newReleaseMovieList} />
          <Footer />
        </>
      )}
    </>
  );
}

export default movie;
