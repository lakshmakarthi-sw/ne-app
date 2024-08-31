import UsersDocument from "../interfaces/users.interface";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const UsersSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        method: {type: String, required: true, enum:["email", "gmail"]},
        is_verify: {type: Boolean, required: true, default: false},
        token: {type: String, required: false},
        is_termed: { type: Boolean, required: true, default: false},
        
        //profile
        fname:  {type: String, required: false, max: 30, default: ""},
        lname: {type: String, required: false, max: 30, default: ""},
        country: {type: String, required: false, max: 30, default: ""},
        ccode: {type: String, required: false, max: 5, default: ""},
        state: {type: String, required: false, max: 30, default: ""},
        city: {type: String, required: false, max: 30, default: ""},
        gender: {type: String, required: false, max: 10, default: "", enum: ["male", "female", "others", ""]},
        married_status: {type: String, required: false, max: 30, default: "", enum: ["single", "married", ""]},
        yob: {type: String, required: false, default: ""},
        aph: {type: String, required: false, max: 30, default: ""},
        languages: [
            {
                name: {type: String, required: false, default: ""},
                proficiency: {type: String, required: false, default: "", enum: ["native", "fluent", "basic", ""]}
            }
        ],
        social_media: [],
        devices: [],
        educations: {type: String, required: false, default: ""},
        //end profile
        
        status: {type: Number, required: true, enum:[0, 1], default: 0}
    },
    {
        timestamps: true
    }
);

UsersSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UsersDocument;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();
    
    // Random additional data
    const salt = await bcrypt.genSalt(Number(process.env.SALTWORKFACTOR));    
    const hash = await bcrypt.hashSync(user.password, salt);
    
    // Replace the password with the hash
    user.password = hash;
    return next();
});

// Used for logging in
UsersSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UsersDocument;
    return bcrypt.compare(candidatePassword, user.password)
    .catch((e) => false);
};

const Users = mongoose.model<UsersDocument>("users", UsersSchema);
export default Users;