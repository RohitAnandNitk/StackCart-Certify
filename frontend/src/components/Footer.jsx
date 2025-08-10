import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
  return (
    <motion.footer
      className="relative overflow-hidden text-white py-10 mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Top glowing line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 animate-gradient" />

      {/* Darker gradient background for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] opacity-95" />

      {/* Content */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10 text-center">
        {/* Brand Name with animated gradient text */}
        <motion.h2
          className="text-2xl font-extrabold bg-gradient-to-r from-green-300 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          &lt;Stackcart/&gt;
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-sm text-gray-300 mt-2 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Building trust, one certificate at a time.
        </motion.p>

        {/* Copyright */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-xs text-gray-400 mt-4"
        >
          © 2025 <span className="font-bold text-green-300">Stackcart</span>.
          All rights reserved.
        </motion.div>
      </div>

      {/* Inline styles */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
        @keyframes textMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-text {
          background-size: 200% 200%;
          animation: textMove 4s ease infinite;
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;
