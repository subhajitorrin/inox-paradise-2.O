import React, { useEffect, useState } from "react";
import useMovie from "../../store/Movie";
import UpdatePage from "./UpdatePage";
import useMasterAdmin from "../../store/MasterAdmin";

function EditMovie() {
  const { movieList, getMovies } = useMovie();
  const [isUpdatePage, setIsUpdatePage] = useState(false);
  const { setUpdateMovie } = useMasterAdmin();

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const isUpdatePage = sessionStorage.getItem("isUpdatePage");
    if (isUpdatePage) setIsUpdatePage(true);
    else setIsUpdatePage(false);
  }, []);

  return (
    <div className="h-full w-full p-[1rem] flex flex-wrap justify-center gap-[2rem]">
      {isUpdatePage ? (
        <UpdatePage setIsUpdatePage={setIsUpdatePage} />
      ) : (
        movieList.map((item, index) => {
          return (
            <div className="flex flex-col gap-[5px]" key={index}>
              <img
                src={item.poster}
                className="h-[300px] w-[200px] object-cover rounded-[10px]"
              />
              <p className="text-center font-[500]">
                {item.title.length > 23 ? (
                  <span>{item.title.slice(0, 23)}...</span>
                ) : (
                  item.title
                )}
              </p>
              <div className="flex">
                <button
                  onClick={() => {
                    sessionStorage.setItem("isUpdatePage", true);
                    setIsUpdatePage(true);
                    setUpdateMovie(item);
                  }}
                  className="transition-all ease-linear duration-200 rounded-l-[5px] w-[50%] bg-[#ffb300] py-[5px] text-[14px] font-[500] hover:bg-[#d59601]"
                >
                  Update
                </button>
                <button className="transition-all ease-linear duration-200 rounded-r-[5px] w-[50%] bg-[#ff3700] py-[5px] text-[14px] font-[500] hover:bg-[#d73001]">
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default EditMovie;
