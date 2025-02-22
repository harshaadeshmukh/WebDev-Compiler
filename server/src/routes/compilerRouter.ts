import express from "express";
import { loadCode, saveCode } from "../controllers/compilerController"; // Ensure path matches project structure

const compilerRouter = express.Router();

// Define POST route for saving code
compilerRouter.post("/save", saveCode);
//compilerRouter.get("/load", loadCode);

compilerRouter.post("/load", loadCode);

export { compilerRouter }; // ✅ Correct TypeScript export
