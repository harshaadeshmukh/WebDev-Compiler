import mongoose from "mongoose";

interface ICodeSchema {
    fullCode: {
        html: string;       //mongo schema
        css: string;
        javascript: string;
    }
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
    fullCode: {     //typescript schema
        html: String,
        css: String,
        javascript: String,
    },
});

export const Code =mongoose.model("Code",CodeSchema)