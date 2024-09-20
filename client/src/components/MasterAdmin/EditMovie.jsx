import React, { useEffect } from "react";
import useMovie from "../../store/Movie";

function EditMovie() {
  const { movieList, getMovies } = useMovie();
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="h-full w-full p-[1rem] flex flex-wrap justify-center gap-[2rem]">
      {movieList.map((item, index) => {
        return (
          <div className="">
            <img
              src={item.poster}
              className="h-[300px] w-[250px] object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

export default EditMovie;
