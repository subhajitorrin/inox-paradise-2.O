import { create } from "zustand";

export const useMobile = create((set) => ({
  isMobile: window.innerWidth < 768,
  setMobile: (width) => {
    set({ isMobile: width < 768 });
  }
}));
