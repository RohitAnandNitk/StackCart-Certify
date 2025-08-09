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
            set({ admin: null });
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
            console.error("Signup error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Signup failed";
            toast.error(errorMessage);
        } finally {
            set({ loading: false });
        }
    },

    //login
    login: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            console.log("Login successful, response:", res.data);
            set({ admin: res.data });
            toast.success("Login successfully");
        } catch (error) {
            console.error("Login error:", error);
            console.error("Error response:", error.response?.data);
            const errorMessage = error.response?.data?.message || error.message || "Login failed";
            toast.error(errorMessage);
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
            console.error("Logout error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Logout failed";
            toast.error(errorMessage);
        } finally {
            set({ loading: false });
        }
    }

}))
