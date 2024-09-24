import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

const useTheaterAdmin = create(
  persist(
    (set, get) => ({
      admin: null,
      isAdminAuthenticated: false,
      isLoading: false,
      screens: [],
      availableScreens: [],
      filteredSchedules: [],
      sendOtpForTheaterRegistration: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/send-otp`,
            {
              email,
              password
            }
          );
          return data.otpid;
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      loginTheaterAdmin: async (otpid, otp, email) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/verify-otp`,
            {
              otpid,
              otp,
              email
            }
          );
          console.log(data);
          set({ admin: data.theaterAdmin, isAdminAuthenticated: true });
          toast.success("Login Successful");
          return data;
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          set({ isLoading: false });
        }
      },

      getTheaterAdmin: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axios.get(
            `${BASE_URL}/theateradmin/get-admin`
          );
          set({ admin: data.theaterAdmin, isAdminAuthenticated: true });
          return data;
        } catch (error) {
          set({ admin: null, isAdminAuthenticated: false });
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },

      logoutAdmin: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(`${BASE_URL}/logout`);
          set({
            admin: null,
            isAdminAuthenticated: false
          });
          return data;
        } catch (error) {
          toast.error(error.response?.data || error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      addScreen: async (screenName, screenType) => {
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/screen/add-screen`,
            {
              screenName,
              screenType
            }
          );
          toast.success("Screen added successfully");
          return data.screen;
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      getScreens: async () => {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/theateradmin/screen/get-screens`
          );
          set({ screens: data.screens });
          return data.screens;
        } catch (error) {
          toast.error(error.response?.data || error.message);
          throw error;
        }
      },
      addCategory: async (screenId, categoryName) => {
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/screen/add-category/${screenId}`,
            {
              categoryName
            }
          );
          toast.success("Category added successfully");
          return data.category;
        } catch (error) {
          toast.error(error.response?.data || error.message);
          throw error;
        }
      },
      updateScreen: async (screenId, screenName, screenType) => {
        try {
          const { data } = await axios.put(
            `${BASE_URL}/theateradmin/screen/update-screen/${screenId}`,
            { screenName, screenType }
          );
          toast.success("Screen updated");
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      deleteScreen: async (screenId) => {
        try {
          const { data } = await axios.delete(
            `${BASE_URL}/theateradmin/screen/delete-screen/${screenId}`
          );
          toast.success("Screen deleted successfully");
          return data;
        } catch (error) {
          toast.error(error.response?.data || error.message);
          throw error;
        }
      },
      updateCategory: async (
        categoryid,
        name,
        rows,
        price,
        seatsPerRow,
        gaps
      ) => {
        try {
          const { data } = await axios.put(
            `${BASE_URL}/theateradmin/screen/update-category/${categoryid}`,
            { name, rows, price, seatsPerRow, gaps }
          );
          toast.success("Category updated");
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      deleteCategory: async (categoryid) => {
        try {
          const { data } = await axios.delete(
            `${BASE_URL}/theateradmin/screen/delete-category/${categoryid}`
          );
          toast.success("Category deleted");
          return data;
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      getAvailableScreens: async (startTime, endTime, date, screenType) => {
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/screen/get-available-screens`,
            { startTime, endTime, date, screenType }
          );
          set({ availableScreens: data.screens });
          return data.screens;
        } catch (error) {
          console.log(error.response?.data?.message || error.message);
          throw error;
        }
      },
      AddSchedule: async (scheduleData) => {
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/schedule/add-schedule`,
            {
              scheduleData
            }
          );
          toast.success("Schedule added");
          return data;
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      getFilteredSchedules: async (filteredData) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(
            `${BASE_URL}/theateradmin/schedule/get-schedules`,
            {
              filteredData
            }
          );
          set({ filteredSchedules: data.schedules });
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: "TheaterAdmin",
      partialize: (state) => ({
        isAdminAuthenticated: state.isAdminAuthenticated,
        admin: state.admin,
        screens: state.screens,
        filteredSchedules: state.filteredSchedules
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useTheaterAdmin;
