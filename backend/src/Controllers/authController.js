import Admin from "../Models/admin.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

// SignUp controller
const signup = async (req, res) => {
  const allowedEmails = [
    "stackcarthiring@gmail.com",
    "anandrohit64748@gmail.com",
  ];

  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 6 characters" });
    }

    const emailToSearch = email.trim().toLowerCase();
    const isAllowed = allowedEmails.includes(emailToSearch);

    if (!isAllowed) {
      return res
        .status(403)
        .json({ message: "Signup is not allowed with this email" });
    }

    const existingAdmin = await Admin.findOne({ email: emailToSearch });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      fullName,
      email: emailToSearch,
      password: hashedPassword,
    });

    await newAdmin.save();

    // Generate JWT and set it as a cookie
    generateToken(newAdmin._id, res, req);

    return res.status(201).json({
      _id: newAdmin._id,
      email: newAdmin.email,
      fullName: newAdmin.fullName,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(admin._id, res, req);

    return res.status(200).json({
      _id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.RENDER_SERVICE_ID;

    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      path: "/",
    });

    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Auth check controller
const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.admin);
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup, login, logout, checkAuth };
