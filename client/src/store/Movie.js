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
      seatMatrix: [],
      selectedSeats: { category: "", price: "", seats: [] },
      selectedSeatNames:[],
      foods:[],
      reviews:[],
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
      },
      setSearchLoading: async (status) => {
        set({ searchLoading: status });
      },
      getSeatMatrix: async (scheduleId) => {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/seatmatrix/${scheduleId}`
          );
          set({ seatMatrix: data });
        } catch (error) {
          console.log(error);
        }
      },
      handleSelectSeats: (seat, category, price, name) => {
        const { selectedSeats } = get();
      
        // Check if no seat is currently selected (i.e., category, price, and seats array are empty)
        if (
          selectedSeats.category === "" &&
          selectedSeats.price === "" &&
          selectedSeats.seats.length === 0
        ) {
          // Set the selected seat with its category, price, and seat details (name and id)
          set({ selectedSeats: { category, price, seats: [{ name, id: seat }] } });
        } 
        // If a seat is already selected with the same category and price
        else if (selectedSeats.category === category && selectedSeats.price === price) {
          // Check if the seat is already included in the selected seats by checking the seat's id
          const isSeatSelected = selectedSeats.seats.some((s) => s.id === seat);
      
          if (isSeatSelected) {
            // If the selected seat is the only one, reset the selected seats (i.e., clear the selection)
            if (selectedSeats.seats.length === 1) {
              set({
                selectedSeats: {
                  category: "",
                  price: "",
                  seats: []
                }
              });
            } else {
              // If there are other seats selected, just remove the specific seat
              set({
                selectedSeats: {
                  ...selectedSeats, // Preserve category and price
                  seats: selectedSeats.seats.filter((s) => s.id !== seat) // Remove the seat by its id
                }
              });
            }
          } else {
            // If the seat is not yet selected, add it to the selected seats array
            if (selectedSeats.seats.length === 10) {
              toast.warning("Maximum 10 seats!");
              return;
            }
            set({
              selectedSeats: {
                ...selectedSeats, // Preserve category and price
                seats: [...selectedSeats.seats, { name, id: seat }] // Add the new seat (name and id) to the selected seats array
              }
            });
          }
        } 
        // If a seat from a different category or price is selected, reset and select the new seat
        else {
          set({ selectedSeats: { category, price, seats: [{ name, id: seat }] } });
        }
      }
      ,
      setEmptySelectedSeats: () => {
        set({ selectedSeats: { category: "", price: "", seats: [] } });
      },
      getAllFoods: async (theaterid) => {
        try {
          const { data } = await axios.get(`${BASE_URL}/user/get-foods/${theaterid}`);
          set({ foods: data });
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
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
