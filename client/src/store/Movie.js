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
      isLoading: false,
      getMovies: async () => {
        try {
          const movies = await axios.get(`${BASE_URL}/get-all-movies`);
          set({ movieList: movies });
        } catch (error) {
          console.log(error);
        }
      }
    }),
    {
      name: "Movie-Store",
      partialize: (state) => ({ movieList: state.movieList }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useMovie;
