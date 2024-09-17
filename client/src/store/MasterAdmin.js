import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useMasterAdmin = create(
  persist(
    (set, get) => ({
      masterAdmin: null,
      isMasterAuthenticated: false,
      isLoading: false,

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
          return data.masterAdmin;
        } catch (error) {
          console.error("Login error:", error);
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
          console.error("Logout error:", error);
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
        isMasterAuthenticated: state.isMasterAuthenticated
      }),
      getStorage: () => sessionStorage
    }
  )
);
