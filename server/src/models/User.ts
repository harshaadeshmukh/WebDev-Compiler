import mongoose, { Schema } from "mongoose";

interface IUserSchema{
    username: string;
    email: string;
    password: string;
    picture: string;
    savedCodes: Array<{_id: string}>;
}

const UserSchema = new Schema<IUserSchema>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz9YHHBs6oiQSVlVFCWCN5_lBW8JzyuDLa1wwS2IOboGlBuNbTMGHSbhKsKem9mXPuAG8&usqp=CAU"
        },


        savedCodes: [
            { type: mongoose.Schema.Types.ObjectId }

        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
//module.exports = User;