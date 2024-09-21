import React, { useEffect, useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useMobile } from "../../store/ScreenWidth";

function MovieRowCard({ movie }) {
  const navigate = useNavigate();
  const [rating, setrating] = useState(0.0);
  const [genre, setgenre] = useState(["Action", "Horror"]);
  const [title, settitle] = useState("Kaha shuru kaha khatam Kaha shuru");
  const [imageList, setImageList] = useState("");

  useEffect(() => {
    settitle(movie.title);
    setgenre(movie.genre);
    setrating(movie.rating);
    setImageList(movie.poster);
  }, [movie]);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        navigate(`/movie/${movie._id}`);
      }}
    >
      <img src={imageList} className="w-[230px] h-[350px] rounded-[10px]" />
      <p className="w-[230px] text-[17px] font-[500]">{title}</p>
      <p className="font-[500] flex items-center gap-[5px]">
        <IoIosStar className="text-[#F84464]" />
        <span>{rating}/10</span>
      </p>
      <div className="flex gap-[7px]">
        {genre.map((item, index) => {
          return (
            <p key={index} className="font-[500] text-[13px]">
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function MovieRows({ title, list }) {
  const [movieList, setMovieList] = useState([]);
  const containerRef = useRef(null);
  const { isMobile } = useMobile();

  useEffect(() => {
    setMovieList(list);
  }, [list]);

  const handleSlideRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 700, behavior: "smooth" });
    }
  };
  const handleSlideLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -700, behavior: "smooth" });
    }
  };
  return (
    <div
      className={`w-[100%] my-[1.5rem]  ${isMobile ? "px-[5%]" : "px-[10%]"}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-[500] mb-[10px]">{title}</h2>
        <div className="flex gap-[10px] mr-[10px]">
          <FaChevronLeft className="cursor-pointer" onClick={handleSlideLeft} />
          <FaChevronLeft
            className="rotate-180 cursor-pointer"
            onClick={handleSlideRight}
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-[1.0rem] scrollNone overflow-x-auto w-full"
      >
        {movieList.map((movie, index) => {
          return <MovieRowCard key={index} movie={movie} />;
        })}
      </div>
    </div>
  );
}

export default MovieRows;
