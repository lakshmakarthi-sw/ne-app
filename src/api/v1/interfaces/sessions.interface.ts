import mongoose from "mongoose";
import { UsersDocument } from "../interfaces/users.interface";

export interface SessionsDocument extends mongoose.Document {
    user: UsersDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}