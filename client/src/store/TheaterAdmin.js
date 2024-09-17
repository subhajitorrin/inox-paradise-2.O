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
      }
    }),
    {
      name: "TheaterAdmin",
      partialize: (state) => ({
        isAdminAuthenticated: state.isAdminAuthenticated,
        admin: state.admin
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useTheaterAdmin;
