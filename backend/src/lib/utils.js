import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const genrateToken = (userId, res, req) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const origin = req.headers.origin || "";
  const isSameOrigin = origin.includes("stackcart-certify.onrender.com");
  const isCrossSite = !isSameOrigin;

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // must be true for cross-site cookies
    sameSite: "none", // must be none for cross-site cookies
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export { genrateToken };
