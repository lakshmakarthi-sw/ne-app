import mongoose from "mongoose";

export interface SettingsDocument extends mongoose.Document {
    name: string;
    value: [
        {
            name: String,
            state: String,
            ccode: String,
            dial_code: String,
            code: String
        }
    ];
}