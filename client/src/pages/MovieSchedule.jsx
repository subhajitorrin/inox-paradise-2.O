import { IoChevronBackSharp } from "react-icons/io5";
import { IoIosOptions } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useMobile } from "../store/ScreenWidth";
import useMovie from "../store/Movie";
import { useEffect, useState } from "react";
function MovieSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const {
    getScheduleList,
    getMovieById,
    selectedDateIndexOnScheule,
    setSelectedDate,
    scheduleList
  } = useMovie();
  const [movie, setmovieDetail] = useState(null);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    async function handleGetMovieById() {
      const movie = await getMovieById(id);
      setmovieDetail(movie);
    }
    if (id) handleGetMovieById();
  }, [id]);

  useEffect(() => {
    function getNext7Days() {
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ];
      const list = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const obj = {
          weekday: days[date.getDay()],
          date: date.getDate(),
          month: months[date.getMonth()]
        };
        list.push(obj);
      }
      setDates(list);
    }
    if (movie) {
      getNext7Days();
    }
  }, [movie]);

  function getDate(data) {
    const monthMap = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11
    };
    const currentYear = new Date().getFullYear();
    const monthIndex = monthMap[data.month];
    const constructedDate = new Date(currentYear, monthIndex, data.date);
    return constructedDate;
  }

  useEffect(() => {
    if (id && dates.length > 0) {
      const date = getDate(dates[selectedDateIndexOnScheule]);
      getScheduleList(id, date);
    }
  }, [id, dates, selectedDateIndexOnScheule, getScheduleList]);

  useEffect(() => {
    console.log(scheduleList);
  }, [scheduleList]);

  if (isMobile) {
    return (
      movie && (
        <div className="">
          {/* top section */}
          <div className="py-[20px] border px-[3%] w-full bg-white font-[500] text-[90%] flex justify-between items-center">
            <div className="flex items-center gap-[20px]">
              <IoChevronBackSharp
                onClick={() => {
                  navigate(-1);
                }}
                className="text-[22px]"
              />
              <p className="text-[1.3rem] font-[600]">{movie.title}</p>
            </div>
            <IoIosOptions className="text-[22px]" />
          </div>

          {/* dates section */}
          <div className="flex border-y border-[#00000015]">
            {dates.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedDate(index);
                  }}
                  className={`${
                    selectedDateIndexOnScheule === index
                      ? "bg-[#F84464] text-white"
                      : ""
                  } flex flex-col items-center flex-[7] py-[10px] text-black text-[82%]`}
                  key={index}
                >
                  <p>{item.weekday}</p>
                  <p className="text-[1.1rem] font-[500]">{item.date}</p>
                  <p>{item.month}</p>
                </div>
              );
            })}
          </div>

          {/* schedule section */}
          <div className=""></div>
        </div>
      )
    );
  }
}

export default MovieSchedule;
