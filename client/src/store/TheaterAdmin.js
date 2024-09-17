import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

const useTheaterAdmin = create(
  persist(
    (set, get) => ({
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
      }
    }),
    {
      name: "TheaterAdmin",
      partialize: (state) => ({}),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useTheaterAdmin;
