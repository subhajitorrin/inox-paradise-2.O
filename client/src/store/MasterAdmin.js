import { create } from "zustand";

export const useMasterAdmin = create((set,get) => ({
  isMasterAuthenticated: true
}));
