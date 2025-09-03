import axios from "axios";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useCertificateStore = create((set) => ({
  certificateId: null,
  loading: false,
  certificateInformation: null,
   certificateUploadCheck: null,

   // this is written only for hide certificate info while clicking home 
   removeCertificate: false , 
   setRemoveCertificate: (data) => set({ removeCertificate: data }),

  setCertificateInformation: (data) => set({ certificateInformation: data }),
  setCertificateId: (data) => set({ certificateId: data }),

  createId: async (data) => {
    console.log("Form data for create id :", data);
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/admin/createId/", data);
      set({ certificateId: res.data.certificateId });
      toast.success("Certificate Id created Successfully");
    } catch (error) {
      console.error("Error in createId:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Error in createId";
      toast.error(errorMessage);
      set({ certificateId: null });
    } finally {
      set({ loading: false });
    }
  },

// upload certificate here

 uploadCertificate : async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/admin/uploadCertificate/", data);
      set({ certificateUploadCheck: res.data.message });
      toast.success("Certificate uploaded Successfully");
    } catch (error) {
      console.error("Error in uploadCertificate:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Error in uploadCertificate";
      toast.error(errorMessage);
      set({ certificateUploadCheck: null });
    } finally {
      set({ loading: false });
    }
 } , 

  getInfo: async ({certificateId}) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/getInfo/${certificateId}`);
      set({ certificateInformation: res.data });
    } catch (error) {
      console.error("Error in getCertificateInfo:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting certificate info";
      toast.error(errorMessage);
      set({ certificateInformation: null });
    } finally {
      set({ loading: false });
    }
  },
}));
