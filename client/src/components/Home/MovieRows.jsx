import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";

function MovieRowCard() {
  const [rating, setrating] = useState(0.0);
  const [genre, setgenre] = useState(["Action", "Horror"]);
  const [title, settitle] = useState("Kaha shuru kaha khatam Kaha shuru");
  const [imageList, setImageList] = useState("");
  return (
    <div className="cursor-pointer">
      <img
        src={imageList}
        className="border border-black w-[230px] h-[350px] rounded-[10px]"
      />
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

function MovieRows(MovieList) {
  return (
    <div className="w-[100%] my-[1.5rem] px-[10%]">
      <h2 className="text-[18px] font-[500] mb-[10px]">Recommended Movies</h2>
      <div className="flex gap-[1.0rem] scrollNone overflow-x-auto w-full">
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
        <MovieRowCard />
      </div>
    </div>
  );
}

export default MovieRows;
