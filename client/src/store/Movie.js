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
      selectedDateIndexOnScheule: 0,
      isLoading: false,
      scheduleList: [],
      searchText: "",
      searchLoading: false,
      searchedList: [],
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
      },
      setSelectedDate: (index) => {
        set({ selectedDateIndexOnScheule: index });
      },
      getScheduleList: async (movieid, date, language, screenType) => {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/get-schedules-by-movie/${movieid}/${date}/${language}/${screenType}`
          );
          set({ scheduleList: data.schedules });
        } catch (error) {
          console.log(error);
        }
      },
      setSearchText: (text) => {
        set({ searchText: text });
      },
      searchMovie: async (query) => {
        set({ searchLoading: true });
        if (query === "") return;
        try {
          const { data } = await axios.get(`${BASE_URL}/search`, {
            params: {
              searchQuery: query
            }
          });
          set({ searchedList: data.list });
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({ searchLoading: false });
        }
      }
    }),
    {
      name: "Movie-Store",
      partialize: (state) => ({
        selectedDateIndexOnScheule: state.selectedDateIndexOnScheule
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useMovie;
