import { Request, Response } from "express";
import { Code } from "../models/Code";

import {fullCodeType} from "../types/compilerTypes";
export const saveCode = async (req: Request, res: Response):Promise<void> => {

    const fullCode:fullCodeType  = req.body;
    if(!fullCode.html && !fullCode.css && !fullCode.javascript){
        res.status(400).send({message:"Empty code cannot be saved!!"});  
        return;
    }
  //  console.log(fullCode);
    try {
        const newCode = await Code.create({
            fullCode: fullCode
        })

        res.status(201).send({ url: newCode._id, status: "saved!!" });
    } catch (error) {
        res.status(500).send({ message: "Error saving code", error });
    }
};


export const loadCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const { urlId } = req.body;

        const existingCode = await Code.findById(urlId);
        if (!existingCode) {
            res.status(404).send({ message: "Code not found!!" });
            return;
        }

        res.status(200).send({ fullCode: existingCode.fullCode });
    } catch (error) {
        console.error("Error loading code:", error);
        res.status(500).send({ message: "Error loading code", error });
    }
};
