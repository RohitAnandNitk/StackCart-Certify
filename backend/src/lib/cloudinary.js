import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// upload function 

const cloudinaryUpload = async (file) => {
    try {

        if (!file) {
            console.log("No file provided in cloudinary upload function ");
            return null;
        }
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, {
            resource_type: "auto",
            folder: "Stackcart_Certify"
        });
        return result;
    } catch (error) {
        console.error("Error in uploading file on cloudinary:", {
            message: error.message,
            http_code: error.http_code,
            name: error.name,
             bufferLength: file.buffer?.length

           // response: error.response?.body || error.error || error.message,
        });
        return null;
    }

};

export default cloudinaryUpload;

