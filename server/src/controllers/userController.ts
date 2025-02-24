import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";


// const User = require("../models/User");
// const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");


export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;


    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(400).send({ message: "User already exists!" });
            return;
        }

        if (usernameRegex.test(username) == false) {
            res.status(400).send({ message: "Username can only contain letters and numbers" });
            return;
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        res.status(201).send({ user });
        return;

    } catch (error) {
        res.status(500).send({ message: "Error signing up!", error: error });
        return;
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { userId, password }: { userId: string, password: string } = req.body;


    try {
        let existingUser = undefined;

        if (userId.includes("@")) {
            existingUser = await User.findOne({ email: userId });
        } else {
            existingUser = await User.findOne({ username: userId });
        }

        if (!existingUser) {
            res.status(400).send({ message: "User not found" });
            return;
        }

        const passwordMatched = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatched) {
            res.status(400).send({ message: "wrong password" });
            return;
        }

        const jwtToken = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!, {
            expiresIn: "1d",
        }
        );

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });

        res.status(200).send({ username: existingUser.username, picture: existingUser.picture, email: existingUser.email,savedCodes:existingUser.savedCodes });
        return;
    } catch (error) {
        res.status(500).send({ message: "Error log in!", error: error });
        return;
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("token");
        res.status(200).send({ message: "logged out successfully!" });
        return;
    } catch (error) {
        res.status(500).send({ message: "Error logging out!", error });
        return;
    }
};