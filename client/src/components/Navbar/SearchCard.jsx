import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import useMovie from "../../store/Movie";

function SearchCard({ item }) {
  const navigate = useNavigate();
  const { setSearchText } = useMovie();
  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    <div
      onClick={() => {
        navigate(`/movie/${item._id}`);
        setSearchText("");
      }}
      className="hover:bg-[#d3d3d3] relative transition-all ease-linear duration-200 hover:border-transparent border-b border-[#00000039] rounded-[7px] py-[10px] px-[2rem] flex gap-[20px] items-start cursor-pointer"
    >
      <div className="h-[200px] w-[130px] rounded-[5px] overflow-hidden">
        <img src={item.poster} alt="" className=" h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-[3px]">
        <p className="text-[1.1rem] font-[500]">
          {item.title} •{" "}
          <span className="text-[.9rem] uppercase font-[400]">
            {item.CBFCrating}
          </span>
        </p>
        <div className="flex items-center gap-[2px] text-[85%]">
          <MdOutlineStarPurple500 className=" text-[#F84464]" />
          <p className="">{item.rating}/10</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <p className="text-[85%]">{item.releaseDate.slice(0, 10)}</p>
          <p className="text-[85%]">{formatMinutesToHours(item.duration)}</p>
        </div>

        <div className="text-[85%] font-[500] flex gap-[10px]">
          {item.genre.map((item, index) => {
            return (
              <p
                key={index}
                className=" border border-black py-[2px] px-[7px] rounded-[5px] text-[85%]"
              >
                {item}
              </p>
            );
          })}
        </div>
        <div className="flex gap-[10px] text-[85%]">
          {item.language.map((lan, i) => {
            return (
              <p key={`${i}`} className="">
                {lan}
              </p>
            );
          })}
        </div>
      </div>
      <div className="h-full absolute right-0 flex items-center mr-[2rem]">
        <MdOpenInNew className="text-[20px]" />
      </div>
    </div>
  );
}

export default SearchCard;
