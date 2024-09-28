import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useUser = create(
  persist((set, get) => ({
    user: null,
    isLogin: null,
    setIsLogin: (value) => set({ isLogin: value })
  })),
  {
    name: "user-store",
    partialize: (state) => ({
      user: state.user
    }),
    storage: createJSONStorage(() => sessionStorage)
  }
);
