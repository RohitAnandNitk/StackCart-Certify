import express from 'express'
import { getInfo } from '../Controllers/getInfoController.js';

const router = express.Router() ; 

router.post('/' , getInfo) ; 

 

export default router; 




