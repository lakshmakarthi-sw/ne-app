import { Request, Response } from "express";
import { findUser, findAndUpdate } from "../services/users.service";
import { message } from "../../../config/constants";
import { getPassword } from "../utils/generate.pwd";
import { sendMail } from "../utils/mail.util";
import { omit , get } from "lodash";

export async function userGetProfileHandler(req: Request, res: Response){
    const userId = get(req, "user._id");
    const userProfile = await findUser({ _id: userId });
    if (userProfile){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(userProfile, "password", "__v", "status", "token", "is_termed", "session", "updatedAt", "iat", "exp")
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function userUpdateProfile(req: Request, res: Response){
    const userProfile = get(req, "user");
    req.body.languages = JSON.parse(req.body.languages);
    const isUpdate = await findAndUpdate({ _id : userProfile._id }, req.body, { new: true });
    if (isUpdate){
        return res.status(200).send({"status": "success", "message": message.msg21});
    } else {
        return res.status(200).send({"status": "error", "message": message.msg22});
    }   
}

export async function userUpdateEmailStatus(req: Request, res: Response){
    const userId = get(req, "user._id");
    const userProfile = await findUser({ _id: userId });
    if (userProfile){
        if (userProfile.token == req.body.code && userProfile.token.length != 0){
            req.body.is_verify = true;
            req.body.status = true;
            req.body.token = Math.floor(100000 + Math.random() * 900000);            
            const isVerified = await findAndUpdate({ _id : userProfile._id }, req.body, { new: true });
            if (isVerified){
                return res.status(200).send({"status": "success", "message": message.msg17});
            } else {
                return res.status(200).send({"status": "error", "message": message.msg25});
            }
        } else {
            return res.status(200).send({"status": "error", "message": message.msg25});
        }
    } else {
        return res.status(200).send({"status": "error", "message": message.msg25});
    }   
}

export async function userVerifyEmail(req: Request, res: Response){
    const userProfile = get(req, "user");
    req.body.token = Math.floor(100000 + Math.random() * 900000);

    if (userProfile.method == "email"){
        let mailRes = await sendMail(req.body.token, "Email verification OTP - taskOK", userProfile.email, "email");
        if (mailRes.messageId != undefined){
            const isUpdate = await findAndUpdate({ _id : userProfile._id }, req.body, { new: true });
            if (isUpdate){
                return res.status(200).send({"status": "success", "message": message.msg19});
            } else {
                return res.status(200).send({"status": "error", "message": message.msg20});
            }
        } else {
            return res.status(200).send({"status": "error", "message": message.msg20});
        }
    } else {
        return res.status(200).send({"status": "error", "message": message.msg20});
    }
}

export async function deleteLanguageHandler(req: Request, res: Response){
    const userId = get(req, "user._id");
    const langIndex = get(req, "params.langIndex");
    const userProfile = await findUser({ _id: userId });

    if (userProfile){
        if (userProfile.languages.length > langIndex){
            userProfile.languages.splice(langIndex, 1);
            req.body.languages = userProfile.languages;
            const isUpdate = await findAndUpdate({ _id : userProfile._id }, req.body, { new: true });
            if (isUpdate){
                return res.status(200).send({"status": "success", "message": message.msg34});
            } else {
                return res.status(200).send({"status": "error", "message": message.msg35});
            }            
        }   
    }
    return res.status(200).send({"status": "error", "message": message.msg20});
}

export async function userAuthChangePassHandler(req: Request, res: Response){
    const userId = get(req, "user._id");
    if (req.body.old_pass != req.body.new_pass){

        // Replace the password with the hash
        req.body.password = await getPassword(req.body.new_pass);

        const isUpdate = await findAndUpdate({ _id : userId }, req.body, { new: true });
        if (isUpdate){
            return res.status(200).send({"status": "success", "message": message.msg30});
        } else {
            return res.status(200).send({"status": "error", "message": message.msg20});
        }
    } else {
        return res.status(200).send({"status": "error", "message": message.msg29});
    }
}