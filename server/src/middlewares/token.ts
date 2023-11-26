import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import RequestError from "../types/RequestError.js";



export const createToken = (email: string, isAdmin: boolean) => {
  if (process.env.ACCESS_TOKEN_SECRET) {

      const user = { email: email, isAdmin: isAdmin };
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
    
  } else {
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

};
export const autoToken = asyncHandler( async (req, _res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new RequestError('Not authorized, no token', 404);
     
  }
  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) ;
      
      req.isAdmin = (decoded as JwtPayload).isAdmin;
      console.log(req.isAdmin);
      
      next();
  } catch (err) {
    throw new RequestError('Not authorized, token failed', 403);
  }
});





