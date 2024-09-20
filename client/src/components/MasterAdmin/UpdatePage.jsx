import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import CastCard from "./CastCard";
import { toast } from "react-toastify";
import useMasterAdmin from "../../store/MasterAdmin";
import { BeatLoader } from "react-spinners";
import { IoIosArrowBack } from "react-icons/io";

const genrelist = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Thriller",
  "Western",
  "Documentary"
];

const CBFClist = ["U", "UA", "A", "S"];

const languageList = [
  "Hindi",
  "Bengali",
  "Telugu",
  "Tamil",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Punjabi",
  "Urdu",
  "Assamese",
  "Gujarati",
  "Odia",
  "Bhojpuri",
  "Rajasthani",
  "Maithili"
];

function UpdatePage({ setIsUpdatePage }) {
  const [isFetching, setIsFetching] = useState(true);
  const [castList, setCastList] = useState([]);
  const [title, settitle] = useState("");
  const [genre, setgenre] = useState([]);
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [CBFCrating, setCBFCrating] = useState("");
  const [language, setLanguage] = useState([]);
  const [poster, setPoster] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const { setUpdateMovie, updateMovieToBackend, updateMovie, isLoading } =
    useMasterAdmin();

  function handleCastList(data, index) {
    const newCastList = [...castList];
    newCastList[index] = data;
    setCastList(newCastList);
  }

  useEffect(() => {
    if (updateMovie !== null) {
      setLanguage(updateMovie.language || []);
      setCastList(updateMovie.castList || []);
      settitle(updateMovie.title || "");
      setgenre(updateMovie.genre || []);
      setDuration(updateMovie.duration || "");
      setReleaseDate(
        updateMovie.releaseDate
          ? new Date(updateMovie.releaseDate).toISOString().split("T")[0]
          : ""
      );
      setCBFCrating(updateMovie.CBFCrating || "");
      setPoster(updateMovie.poster || "");
      setTrailerUrl(updateMovie.trailerUrl || "");
      setSynopsis(updateMovie.synopsis || "");
    }
    setIsFetching(false);
  }, [updateMovie]);

  useEffect(() => {
    updateMovie.castList = castList;
    updateMovie.title = title;
    updateMovie.genre = genre;
    updateMovie.duration = duration;
    updateMovie.releaseDate = releaseDate;
    updateMovie.CBFCrating = CBFCrating;
    updateMovie.poster = poster;
    updateMovie.trailerUrl = trailerUrl;
    updateMovie.synopsis = synopsis;
    updateMovie.language = language;
    setUpdateMovie(updateMovie);
  }, [
    castList,
    title,
    genre,
    duration,
    releaseDate,
    CBFCrating,
    poster,
    trailerUrl,
    synopsis,
    language
  ]);

  async function handleUpdateMovie() {
    if (
      !title ||
      !genre.length > 0 ||
      !duration ||
      !releaseDate ||
      !CBFCrating ||
      !language.length > 0 ||
      !poster ||
      !trailerUrl ||
      !synopsis
    ) {
      toast.warn("Fill all the fields");
      return;
    }

    const movieData = {
      title,
      genre,
      duration,
      releaseDate,
      CBFCrating,
      language,
      castList,
      poster,
      trailerUrl,
      synopsis
    };
    try {
      await updateMovieToBackend(movieData);
      setIsUpdatePage(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isFetching === true) return <></>;

  return (
    <div className="h-full w-full p-[1rem] flex justify-between overflow-y-auto">
      <IoIosArrowBack
        onClick={() => {
          sessionStorage.removeItem("isUpdatePage");
          setIsUpdatePage(false);
        }}
        className="text-[20px] cursor-pointer"
      />
      <div className="flex flex-col gap-[1rem] w-[50%] items-center">
        <p className="font-[500]">*Provide Movie Details and Add to Database</p>
        {/* title */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="movietitle" className="font-[500] w-[100px]">
            Movie Title
          </label>
          <input
            onChange={(e) => settitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter movie title"
            id="movietitle"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* duration */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="duration" className="font-[500] w-[100px]">
            Duration
          </label>
          <input
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            type="number"
            placeholder="Enter duration in minutes"
            id="duration"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* release date */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="releasedate" className="font-[500] w-[100px]">
            Release Date
          </label>
          <input
            onChange={(e) => setReleaseDate(e.target.value)}
            value={releaseDate}
            type="date"
            id="releasedate"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* CBFC rating */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="CBFCrating" className="font-[500] w-[100px]">
            CBFC Rating
          </label>
          <select
            onChange={(e) => setCBFCrating(e.target.value)}
            value={CBFCrating}
            id="CBFCrating"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          >
            <option value="">Select CBFC Rating</option>
            {CBFClist.map((item) => (
              <option key={item} value={item.toLowerCase()}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* poster */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="poster" className="font-[500] w-[100px]">
            Poster
          </label>
          <input
            onChange={(e) => setPoster(e.target.value)}
            type="text"
            id="poster"
            value={poster}
            placeholder="Enter poster url"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* trailer url */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="movietitle" className="font-[500] w-[100px]">
            Trailer URL
          </label>
          <input
            onChange={(e) => setTrailerUrl(e.target.value)}
            value={trailerUrl}
            type="text"
            placeholder="Enter trailer url"
            id="movietrailerurl"
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>

        {/* synopsis */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="synopsis" className="font-[500] w-[100px]">
            Synopsis
          </label>
          <textarea
            onChange={(e) => setSynopsis(e.target.value)}
            value={synopsis}
            id="synopsis"
            placeholder="Enter synopsis of movie"
            style={{ resize: "none" }}
            rows={5}
            className="bg-[#353333] outline-none rounded-[5px] px-[20px] py-[10px] w-[400px] text-[14px]"
          />
        </div>
        <button
          disabled={isLoading}
          onClick={handleUpdateMovie}
          className="text-[15px] font-[500] w-[85%] mx-[1rem] py-[5px] rounded-[5px] bg-[#3eab03]"
        >
          {isLoading ? (
            <BeatLoader color="#ffffff" size={5} />
          ) : (
            "Update Movie & Save to Database"
          )}
        </button>
      </div>
      <div className="w-[50%] items-center flex flex-col gap-[1rem] h-full overflow-y-auto scrollNone">
        {/* genre */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="genre" className="font-[500] w-[100px]">
            Genre
          </label>
          <Multiselect
            options={genrelist.map((genre) => ({ name: genre }))}
            displayValue="name"
            selectedValues={genre.map((genre) => ({ name: genre }))}
            onSelect={(selectedList) => {
              const list = selectedList.map((item) => item.name);
              setgenre(list);
            }}
            onRemove={(selectedList) => {
              const list = selectedList.map((item) => item.name);
              setgenre(list);
            }}
            className="w-[400px] bg-[#353333]"
            style={{
              option: {
                color: "white"
              },
              optionContainer: {
                backgroundColor: "#353333"
              },
              searchBox: {
                border: "none",
                paddingLeft: "20px"
              },
              multiselectContainer: {
                width: "400px",
                borderRadius: "5px",
                fontSize: "14px",
                paddingTop: "5px",
                paddingBottom: "5px"
              }
            }}
          />
        </div>

        {/* language */}
        <div className="flex gap-[10px] items-center">
          <label htmlFor="language" className="font-[500] w-[100px]">
            Language
          </label>
          <Multiselect
            options={languageList.map((item) => ({ name: item }))}
            displayValue="name"
            selectedValues={language.map((item) => ({ name: item }))}
            onSelect={(selectedList) => {
              const list = selectedList.map((item) => item.name);
              setLanguage(list);
            }}
            onRemove={(selectedList) => {
              const list = selectedList.map((item) => item.name);
              setLanguage(list);
            }}
            className="w-[400px] bg-[#353333]"
            style={{
              option: {
                color: "white"
              },
              optionContainer: {
                backgroundColor: "#353333"
              },
              searchBox: {
                border: "none",
                paddingLeft: "20px"
              },
              multiselectContainer: {
                width: "400px",
                borderRadius: "5px",
                fontSize: "14px",
                paddingTop: "5px",
                paddingBottom: "5px"
              }
            }}
          />
        </div>

        <p className="font-[500] text-center ">Actors & Actresses </p>
        {castList.map((item, index) => {
          return (
            <CastCard
              key={index}
              index={index}
              item={item}
              handleCastList={handleCastList}
            />
          );
        })}
        {!isLoading && (
          <div className="flex justify-center gap-[1rem]">
            <button
              onClick={() => {
                setCastList((prev) => [...prev, { name: "", photo: "" }]);
              }}
              className="text-[15px] font-[500] px-[20px] py-[5px] rounded-[5px] bg-[#d18c02]"
            >
              New Cast
            </button>
            {castList.length > 0 && (
              <button
                onClick={() => {
                  setCastList((prev) => prev.slice(0, -1));
                }}
                className="text-[15px] font-[500] px-[20px] py-[5px] rounded-[5px] bg-[#d13d02]"
              >
                Remove Cast
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdatePage;
