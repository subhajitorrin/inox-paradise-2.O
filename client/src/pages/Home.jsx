import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousol from "../components/Home/Carousol";
import MovieRows from "../components/Home/MovieRows";
import useMovie from "../store/Movie";

function Home() {
  const { upcomingMoviesList, newReleaseMovieList } = useMovie();
  const { getUpcomingMovies, getNewReleaseMovies } = useMovie();
  useEffect(() => {
    getUpcomingMovies();
  }, []);
  useEffect(() => {
    getNewReleaseMovies();
  }, []);
  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full">
      <Navbar />
      <Carousol />
      <MovieRows title={"New Releases"} list={newReleaseMovieList} />
      <MovieRows title={"Upcoming Movies"} list={upcomingMoviesList} />
    </div>
  );
}

export default Home;
