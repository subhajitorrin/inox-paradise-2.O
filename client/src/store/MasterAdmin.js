import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useMasterAdmin = create((set, get) => ({
  masterAdmin: null,
  isMasterAuthenticated: false,
  isLoading: false,
  loginMasterAdmin: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${BASE_URL}/masteradmin/login`, {
        email,
        password
      });
      set({ masterAdmin: res.data.masterAdmin, isMasterAuthenticated: true });
      return res.data.masterAdmin;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logoutMasterAdmin: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/logout`);
      set({ masterAdmin: null, isMasterAuthenticated: false });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));
