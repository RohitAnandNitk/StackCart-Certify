import express from 'express'
import { getInfo } from '../Controllers/getInfoController.js';

const router = express.Router() ; 

router.get('/:id' , getInfo) ; 

 

export default router; 




