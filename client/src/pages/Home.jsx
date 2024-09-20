import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousol from "../components/Home/Carousol";
import MovieRows from "../components/Home/MovieRows";
import useMovie from "../store/Movie";

function Home() {
  const { upcomingMoviesList } = useMovie();
  const { getUpcomingMovies } = useMovie();
  useEffect(() => {
    getUpcomingMovies();
  }, []);
  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full">
      <Navbar />
      <Carousol />
      <MovieRows title={"Upcoming Movies"} list={upcomingMoviesList} />
    </div>
  );
}

export default Home;
