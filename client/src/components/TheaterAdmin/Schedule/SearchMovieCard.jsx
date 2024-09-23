import { MdOutlineStarPurple500 } from "react-icons/md";

function formatMinutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}hr ${mins}m`;
}

function SearchMovieCard({ movie }) {
  return (
    <div className="hover:bg-[#444242] border-y border-[#ffffff1d] p-[7px] cursor-pointer flex gap-[10px] rounded-[7px]">
      <img src={movie.poster} className="h-[150px] w-[100px] object-cover" />
      <div className="flex flex-col text-[85%] ">
        <p className="font-[500] mb-[10px]">{movie.title}</p>
        <p className="text-[85%] ">{formatMinutesToHours(movie.duration)}</p>
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
}

export default SearchMovieCard;
