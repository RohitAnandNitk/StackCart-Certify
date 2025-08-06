import jwt from "jsonwebtoken";
import Admin from "../Models/admin.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // requires app.use(cookieParser())
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Throws if invalid/expired
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // payload should contain { userId }
    const admin = await Admin.findById(payload.userId).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }

    req.admin = admin;
    return next();
  } catch (err) {
    // Handle common JWT errors explicitly
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    console.error("Error in protectRoute middleware:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default protectRoute;
