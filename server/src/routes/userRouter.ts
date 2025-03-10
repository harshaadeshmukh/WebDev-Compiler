import { Router } from "express";
import { signup, login, logout, userDetails } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";


const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/user-details", verifyToken, userDetails);



export default userRouter;
