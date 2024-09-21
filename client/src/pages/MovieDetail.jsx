import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import useMovie from "../store/Movie";
import Navbar from "../components/Navbar/Navbar";
import { MdOutlineStarPurple500 } from "react-icons/md";

function movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setmovieDetail] = useState(null);
  const { getMovieById } = useMovie();

  useEffect(() => {
    async function handleGetMovieById() {
      const movie = await getMovieById(id);
      console.log(movie);
      setmovieDetail(movie);
    }
    if (id) handleGetMovieById();
  }, []);

  const opts = {
    height: "450",
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
        <div className="px-[10%] w-full h-screen flex gap-[20px]">
          {/* left */}
          <div className="border h-full flex flex-col  gap-[5px]">
            <img
              src={movie.poster}
              className="h-[450px] w-[300px] object-cover rounded-[10px]"
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
          </div>

          {/* right */}
          <div className="border flex-1 h-full"></div>
        </div>
      )}
    </>
  );
}

export default movie;
