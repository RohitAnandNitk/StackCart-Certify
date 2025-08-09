import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db.js";
import authRoutes from "./Routes/authRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import getInfoRoutes from "./Routes/getInfoRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// allow json req
app.use(express.json());
// use cookieparser
app.use(cookieParser());
app.set("trust proxy", 1);

// allow cors

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev frontend
      "https://stackcart-certify.vercel.app", // production frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// test

// app.get('/' , (req , res)=> {
//      res.send('api is working') ;
// })

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/getInfo", getInfoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
