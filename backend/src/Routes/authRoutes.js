import express from 'express'
import {signup , login , logout , checkAuth} from '../Controllers/authController.js'
import protectRoute from '../Middlewares/auth.middleware.js';

const router = express.Router() ; 

router.post('/signup' , signup) ; 

router.post("/login" , login); 

router.get("/logout" , logout) ; 

router.get("/checkAuth" ,protectRoute ,  checkAuth) ;

// Debug route to check cookies
router.get("/debug", (req, res) => {
  res.json({
    cookies: req.cookies,
    headers: req.headers,
    hasJWT: !!req.cookies?.jwt
  });
}); 

export default router; 




