import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export async function getPassword(
    password : string
){
    // Random additional data
    const salt = await bcrypt.genSalt(Number(process.env.SALTWORKFACTOR));    
    return await bcrypt.hashSync(password, salt);
}
