import { create } from "zustand";

export const useUser = create((set) => ({
  isLogin: null,
  setIsLogin: (value) => set({ isLogin: value })
}));
