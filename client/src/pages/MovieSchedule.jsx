import { IoChevronBackSharp } from "react-icons/io5";
import { IoIosOptions } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useMobile } from "../store/ScreenWidth";
import useMovie from "../store/Movie";
import { useEffect, useRef, useState } from "react";
import TheaterCards from "../components/MovieSchedules/TheaterCards";
import { MdArrowDropDown } from "react-icons/md";

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
  const [language, setLanguage] = useState("");
  const [screenType, setScreenType] = useState("");
  const [toggleLangugae, setToggleLangugae] = useState(false);
  const [toggleScreenType, setToggleScreenType] = useState(false);
  const languageRef = useRef(null);
  const screenTypeRef = useRef(null);

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
    function handleOutsideClick(e) {
      if (!movie) return;
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setToggleLangugae(false);
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!movie) return;
      if (screenTypeRef.current && !screenTypeRef.current.contains(e.target)) {
        setToggleScreenType(false);
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (movie) {
      setLanguage(movie.language[0]);
    }
  }, [movie]);
  useEffect(() => {
    if (movie) {
      setScreenType(movie.screenType[0]);
    }
  }, [movie]);

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

          {/* language and screen type */}
          <div className="p-[10px] flex items-center gap-[10px]">
            <div className="relative font-[500]" ref={languageRef}>
              <div className=" relative w-[70px] flex items-center justify-between">
                <MdArrowDropDown className="absolute left-0" />
                <input
                  type="text"
                  className=" outline-none w-[70px] ml-[20px]"
                  placeholder="Language"
                  onClick={() => {
                    setToggleLangugae(true);
                  }}
                  readOnly={true}
                  value={language}
                />
              </div>
              {toggleLangugae && (
                <div className="rounded-[5px] px-[10px] absolute top-[120%] z-[10] bg-white border border-[#0000003f]">
                  {movie &&
                    movie.language.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setLanguage(item);
                            setToggleLangugae((prev) => !prev);
                          }}
                          className="p-[5px] px-[10px]"
                        >
                          {item}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="relative font-[500]" ref={screenTypeRef}>
              <div className=" relative w-[100px] flex items-center justify-between">
                <MdArrowDropDown className="absolute left-0" />
                <input
                  type="text"
                  className=" outline-none w-[100px] ml-[20px]"
                  placeholder="Screen type"
                  onClick={() => {
                    setToggleScreenType(true);
                  }}
                  readOnly={true}
                  value={screenType}
                />
              </div>
              {toggleScreenType && (
                <div className="rounded-[5px] px-[10px] absolute top-[120%] z-[10] bg-white border border-[#0000003f]">
                  {movie &&
                    movie.screenType.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setScreenType(item);
                            setToggleScreenType((prev) => !prev);
                          }}
                          className="p-[5px] px-[10px]"
                        >
                          {item}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* schedule section */}
          <div className="min-h-screen gap-[5px] flex flex-col p-[10px] bg-[#f4f4f4]">
            {scheduleList &&
              scheduleList.map((item, index) => {
                return (
                  <TheaterCards
                    key={index}
                    theater={item.theater}
                    list={item.scheduleList}
                  />
                );
              })}
          </div>
        </div>
      )
    );
  }
}

export default MovieSchedule;
