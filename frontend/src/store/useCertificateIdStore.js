import axios from "axios";
import { axiosInstance } from "../lib/axios.js";
import { create } from 'zustand'
import toast from 'react-hot-toast'

export const useCertificateStore = create((set) => ({
     certificateId : null , 
      loading : false  , 
      certificateInformation : null ,
      
     setCertificateInformation: (data) => set({ certificateInformation: data }) , 
     setCertificateId: (data) => set({ certificateId: data }) , 


    createId: async (data) => {
        set({loading : true})
        try {
            const res = await axiosInstance.post("/admin/createId/" , data);
            set({ certificateId: res.data.certificateId });
            toast.success("Certificate Id created Successfully")
        } catch (error) {
            console.log("Error in createId:", error);
            toast.error(error.response.data.message || "Error in createId")
            set({ certificateId: null });
        } finally {
            set({ loading: false });
        }
    },
    getInfo : async (data) => {
        set({loading : true})
        try {
            const res = await axiosInstance.post("/getInfo" , data);
            set({ certificateInformation : res.data});
        } catch (error) {
            console.log("Error in getCertificateInfo:", error);
            toast.error(error.response.data.message) ; 
            set({ certificateInformation: null });
        } finally {
            set({ loading: false });
        }
    },
    
}))
