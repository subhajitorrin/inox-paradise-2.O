import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

const useUser = create(
  persist(
    (set, get) => ({
      user: null,
      isLogin: null,
      isAuthenticating: true,
      toggleSidenavbar: false,
      myBookings:[],
      setIsLogin: (value) => set({ isLogin: value }),
      sendOtp: async (email, password, name) => {
        try {
          const { data } = await axios.post(`${BASE_URL}/user/send-otp`, {
            email,
            password,
            name
          });
          toast.success("Otp send successfully");
          return data;
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      veirfyOtp: async (email, password, otpId, otp, name) => {
        try {
          const { data } = await axios.post(`${BASE_URL}/user/verify-otp`, {
            email,
            password,
            otpId,
            otp,
            name
          });
          toast.success("User registered, Login now");
          set({ isLogin: true });
          return data;
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      login: async (email, password) => {
        try {
          const { data } = await axios.post(`${BASE_URL}/user/login`, {
            email,
            password
          });
          set({ user: data.user, isLogin: null });
          toast.success("Login successfull");
          return data;
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      getUser: async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/user/get-user`);
          set({ user: data });
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({ isAuthenticating: false });
        }
      },
      setToggleSideNavbar:(value)=>{
        set({toggleSidenavbar:value})
      },
      Logout: async () => {
        try {
          await axios.post(`${BASE_URL}/user/logout`);
          set({ user: null, isLogin: null });
          toast.success("Logout successfull");
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      bookTicket:async(ticketData)=>{
        try{
          const {data}=await axios.post(`${BASE_URL}/user/book-ticket`,{ticketData});
          return data;
        }catch(error){
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
          throw error;
        }
      },
      getMyBookings:async()=>{
        try {
          const {data} = await axios.get(`${BASE_URL}/user/get-bookings`)
          set({myBookings:data.bookings})
        } catch (error) {
          console.log(error);
        }
      },
      cancelBooking:(id)=>{
        try{
          axios.put(`${BASE_URL}/user/cancel-booking/${id}`)
        }catch(error){
          console.log(error.response.data)
          toast.error(error.response?.data?.message || error.message);
        }
      }
    }),
    {
      name: "Inox-User-Store",
      partialize: (state) => ({
        user: state.user
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useUser;
