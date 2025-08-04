import express from 'express'  ; 
import protectRoute from '../Middlewares/auth.middleware.js'; 
import { createId } from '../Controllers/adminController.js';
const router = express.Router() ; 

router.post("/createId" , protectRoute , createId ) ; 



export default router ; 