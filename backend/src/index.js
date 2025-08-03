import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './lib/db.js';

dotenv.config() ; 
const app = express() ; 
const PORT = process.env.PORT || 8001 ; 


// allow cors 

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/' , (req , res)=> {
     res.send('api is working') ; 
})

// app.use("api/auth" , authRutes) ; 



app.listen(PORT , ()=> {
     console.log(`Server is running on PORT ${PORT}`) ;
     connectDB() ; 
}) ; 


