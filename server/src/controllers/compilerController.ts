import { Request, Response } from "express";
import { Code } from "../models/Code";

export const saveCode = async (req: Request, res: Response) => {

    const { fullCode } = req.body;
    try {
        const newCode = await Code.create({
            fullCode: fullCode
        })

        res.status(201).send({ url: newCode._id, status: "saved!!" });
    } catch (error) {
        res.status(500).send({ message: "Error saving code", error });
    }
};


// export const loadCode = async (req: Request, res: Response) => {
//     const { urlId } = req.body

//     try {
//         const exisitingCode = await Code.findById(urlId);
//         if (!exisitingCode) {
//             return res.status(404).send({ message: "Code not found!!" })

//         }
//         res.status(201).send({ fullCode: exisitingCode.fullCode });

//     } catch (error) {
//         res.status(500).json({ message: "Error loading code", error });
//     }
// }

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
