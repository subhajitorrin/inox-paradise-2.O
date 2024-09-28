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
    setIsLogin: (value) => set({ isLogin: value }),
    sendOtp: async (email, password) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/user/send-otp`, {
          email,
          password
        });
        toast.success("Otp send successfully");
        return data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        throw error;
      }
    },
    veirfyOtp: async (email, password, otpId, otp) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/user/verify-otp`, {
          email,
          password,
          otpId,
          otp
        });
        toast.success("Otp verified successfully");
        return data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        throw error;
      }
    }
  })),
  {
    name: "user-store",
    partialize: (state) => ({
      user: state.user
    }),
    storage: createJSONStorage(() => sessionStorage)
  }
);
