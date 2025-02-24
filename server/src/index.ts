import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
//import UserAuthRouter from "./routes/userRouter";
import userRouter from "./routes/userRouter";

config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || "http://localhost:5173" }));

// Routes
app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

// Database connection
dbConnect().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
