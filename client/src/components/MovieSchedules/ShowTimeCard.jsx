import { useMobile } from "../../store/ScreenWidth";
import { useNavigate } from "react-router-dom";

function ShowTimeCard({ show }) {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return (
    <div
      onClick={() => {
        navigate(`/seatmatrix/${show._id}`);
      }}
      className={`cursor-pointer border border-[#0000002d] ${
        isMobile ? "px-[15px] py-[7px]" : "px-[20px] py-[2px]"
      } rounded-[5px]`}
    >
      <p
        className={`font-[500] text-center ${
          isMobile ? "" : "text-[85%] font-bold"
        }  ${
          show.availableSeats < show.totalSeats / 2
            ? "text-[#c4056b]"
            : "text-[#28c405]"
        }`}
      >
        {new Date(show.startTime).toLocaleTimeString(undefined, options)}
      </p>
      <p className={`text-center ${isMobile ? "text-[70%]" : "text-[65%]"} `}>
        Available <span>{show.availableSeats}</span>
      </p>
    </div>
  );
}

export default ShowTimeCard;
