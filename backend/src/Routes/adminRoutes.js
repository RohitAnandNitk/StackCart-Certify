import express from 'express'  ; 
import protectRoute from '../Middlewares/auth.middleware.js'; 
import { createId , uploadCertificate } from '../Controllers/adminController.js';
import uploadMiddleware from "../Middlewares/multerMiddleware.js"

const router = express.Router() ; 

router.post("/createId" , protectRoute , createId ) ; 
router.post("/uploadCertificate" , protectRoute , uploadMiddleware.single("certificate") , uploadCertificate ) ; 



export default router ; 