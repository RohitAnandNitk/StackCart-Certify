import express from 'express' ; 
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' ; 

const genrateToken = (userId , res) => {
    // token will expire in 7 days 
   const token = jwt.sign({userId} , process.env.JWT_SECRET , {
       expiresIn : "7d" , 
   }) ; 
      
   // save token in cookie && maxAge in ms
      res.cookie("jwt" , token , {
        maxAge : 7 * 24 * 60 * 60 * 1000 , 
        httpOnly : true , 
        sameSite : "strict" , 
        secure : process.env.NODE_ENV != "development" , 
      }) ;

      return token ; 

}

export {genrateToken} ; 