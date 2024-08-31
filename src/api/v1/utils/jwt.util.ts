import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const privateKey = process.env.PRIVATEKEY;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey as string, options);
}

export function decode(token: string){
    try{
        const decoded = jwt.verify(token, privateKey as string);
        return { valid: true, expired: false, decoded };
    } catch(error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}