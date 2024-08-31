import mongoose from "mongoose";
import { string } from "yup/lib/locale";

export interface UsersDocument extends mongoose.Document {
    email: string,
    password: string,
    method: string,
    is_verify: boolean,
    token: string,
    is_termed: boolean,
    fname: string,
    lname: string,
    country: string,
    ccode: string,
    state: string,
    city: string,
    gender: string,
    married_status: string,
    yob: string,
    aph: string,
    educations: string,
    languages: [
        {
            name: String,
            proficiency: String,
        }
    ],
    social_media: [],
    devices: [],
    status: number,
    created_at: Date,
    updated_at: Date,
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export default UsersDocument;
