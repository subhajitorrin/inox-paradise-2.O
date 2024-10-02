import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

const useMasterAdmin = create(
  persist(
    (set, get) => ({
      masterAdmin: null,
      updateMovie: null,
      isMasterAuthenticated: null,
      isLoading: false,
      theaters: [],

      loginMasterAdmin: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(`${BASE_URL}/masteradmin/login`, {
            email,
            password
          });
          set({
            masterAdmin: data.masterAdmin,
            isMasterAuthenticated: true
          });
          toast.success("Login successfull");
          return data.masterAdmin;
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logoutMasterAdmin: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(`${BASE_URL}/logout`);
          set({
            masterAdmin: null,
            isMasterAuthenticated: false
          });
          return data;
        } catch (error) {
          console.error("Logout error:", error.response?.data || error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getMasterAdmin: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/masteradmin/get-master-admin`
          );
          set({
            masterAdmin: data.masterAdmin,
            isMasterAuthenticated: true
          });
          return data.masterAdmin;
        } catch (error) {
          set({
            masterAdmin: null,
            isMasterAuthenticated: false
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      sendOtpForTheaterRegistration: async (email, name) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/masteradmin/send-otp-for-theater-registration`,
            {
              email,
              name
            }
          );
          return data.otpid;
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      addTheater: async (email, password, address, city, name, otpId, otp) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/masteradmin/add-theater-admin`,
            {
              email,
              password,
              address,
              city,
              name,
              otpId,
              otp
            }
          );
          set((state) => ({
            theaters: [...state.theaters, data.theater]
          }));
          return data;
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getAllTheaters: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axios.get(
            `${BASE_URL}/masteradmin/get-all-theaters`
          );
          set({ theaters: data.theaters });
          return data.theaters;
        } catch (error) {
          console.log(error);

          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteTheater: async (id) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.delete(
            `${BASE_URL}/masteradmin/delete-theater/${id}`
          );
          set((state) => ({
            theaters: state.theaters.filter((item) => item._id !== id)
          }));
          return data;
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      addMovie: async (movieData) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/masteradmin/add-movie`,
            { movieData },
            { headers: { "Content-Type": "application/json" } }
          );
          toast.success("Movie added successfully");
          return data;
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      setUpdateMovie: (movieData) => {
        set({ updateMovie: movieData });
      },

      updateMovieToBackend: async (movieData, movieid) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.put(
            `${BASE_URL}/masteradmin/update-movie/${movieid}`,
            { movieData },
            { headers: { "Content-Type": "application/json" } }
          );
          set({ updateMovie: data.movie });
          toast.success("Movie updated successfully");
          return data;
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: "masteradmin",
      partialize: (state) => ({
        masterAdmin: state.masterAdmin,
        isMasterAuthenticated: state.isMasterAuthenticated,
        theaters: state.theaters,
        updateMovie: state.updateMovie
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useMasterAdmin;
