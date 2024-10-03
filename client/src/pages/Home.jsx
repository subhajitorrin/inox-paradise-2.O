import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousol from "../components/Home/Carousol";
import MovieRows from "../components/Home/MovieRows";
import useMovie from "../store/Movie";
import Footer from "@/components/Footer/Footer";

function Home() {
  const { upcomingMoviesList, newReleaseMovieList, topMoviesList } = useMovie();
  const { getUpcomingMovies, getNewReleaseMovies, getTopMovies } = useMovie();
  useEffect(() => {
    getUpcomingMovies();
  }, []);
  useEffect(() => {
    getNewReleaseMovies();
  }, []);
  useEffect(() => {
    getTopMovies();
  }, []);
  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full">
      <Navbar />
      <Carousol />
      {topMoviesList.length > 0 && (
        <MovieRows title={"Top Movies"} list={topMoviesList} />
      )}
      {newReleaseMovieList.length > 0 && (
        <MovieRows title={"New Releases"} list={newReleaseMovieList} />
      )}
      {upcomingMoviesList.length > 0 && (
        <MovieRows title={"Upcoming Movies"} list={upcomingMoviesList} />
      )}
      <Footer />
    </div>
  );
}

export default Home;
