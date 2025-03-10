import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response,NextFunction } from "express";


export interface AuthRequest extends Request {
  _id?: string;
}


export const verifyToken = async (
  req:AuthRequest, 
  res:Response, 
  next:NextFunction): 
  Promise<void> => 
    {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send({ message: "You are unauthorized." });
    return;
  }
  jwt.verify(token, process.env.JWT_KEY!, (err:JsonWebTokenError | null, data:any) => {
    if (err) {
      res.status(401).send({ message: "You are unauthorized." });
      return;
    }
    req._id = data._id;
    next();
  });
};