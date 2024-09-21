import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

const useMovie = create(
  persist(
    (set, get) => ({
      movieList: [],
      upcomingMoviesList: [],
      newReleaseMovieList: [],
      isLoading: false,
      getMovies: async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/get-all-movies`);
          set({ movieList: data });
        } catch (error) {
          console.log(error);
        }
      },
      getUpcomingMovies: async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/get-upcoming-movies`);
          set({ upcomingMoviesList: data });
        } catch (error) {
          console.log(error);
        }
      },
      getNewReleaseMovies: async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/get-newrelease-movies`);
          set({ newReleaseMovieList: data });
        } catch (error) {
          console.log(error);
        }
      },
      getMovieById: async (id) => {
        try {
          const { data } = await axios.get(`${BASE_URL}/movie-by-id/${id}`);
          return data;
        } catch (error) {
          console.log(error);
        }
      }
    }),
    {
      name: "Movie-Store",
      partialize: (state) => ({}),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useMovie;
