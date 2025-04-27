import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any; 
}

const userAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized access - token not provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized access - Invalid token" });
      return;
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server not responding" });
  }
};

export { userAuth };
