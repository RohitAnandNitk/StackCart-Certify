import axios from "axios";
import { axiosInstance } from "../lib/axios.js";
import { create } from 'zustand'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,
    admin: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");

            set({ admin: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ loading: false });
        }
    },
    signup: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ admin: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message );
        } finally {
            set({ loading: false });
        }
    },

    //login
    login: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ admin: res.data });
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    // logout
    logout: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/auth/logout");
            set({ admin: null });
            toast.success("Logout successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    }

}))
