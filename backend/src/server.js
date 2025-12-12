import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// FRONTEND STATIC SERVE FOR PRODUCTION
const __dirname = path.resolve();
const distPath = path.join(__dirname, "..", "..", "frontend", "dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));

  // 🔥 EXPRESS 5 COMPATIBLE CATCH-ALL ROUTE
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  connectDB();
});


