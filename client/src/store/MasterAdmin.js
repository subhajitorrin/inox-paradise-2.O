import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

const useMasterAdmin = create(
  persist(
    (set, get) => ({
      masterAdmin: null,
      isMasterAuthenticated: null,
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
          console.error("Login error:", error.response?.data || error.message);
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
      }
    }),
    {
      name: "masteradmin",
      partialize: (state) => ({
        masterAdmin: state.masterAdmin,
        isMasterAuthenticated: state.isMasterAuthenticated
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useMasterAdmin;
