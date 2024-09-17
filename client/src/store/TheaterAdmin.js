import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useTheaterAdmin = create(
  persist(
    (set, get) => ({
      isAdminAuthenticated: false,
      isLoading: false
    }),
    {
      name: "TheaterAdmin",
      partialize: (state) => ({}),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useTheaterAdmin;
