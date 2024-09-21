import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import useMovie from "../store/Movie";
import Navbar from "../components/Navbar/Navbar";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetail, setmovieDetail] = useState(null);
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

  return (
    <>
      <Navbar />
      {movieDetail && (
        <div className="px-[10%] w-full h-screen flex gap-[20px]">
          {/* left */}
          <div className="border h-full">
            <img
              src={movieDetail.poster}
              className="h-[450px] w-[300px] object-cover rounded-[10px]"
            />
          </div>

          {/* right */}
          <div className="border flex-1 h-full"></div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
