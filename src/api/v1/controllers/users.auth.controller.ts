import { Request, Response } from "express";
import { createUser, validatePassword, emailExist, findUser, findAndUpdate } from "../services/users.service";
import { createSession, createAccessToken, updateSession, findSessions } from "../services/sessions.service";
import { message } from "../../../config/constants";
import { sendMail } from "../utils/mail.util";
import { getPassword } from "../utils/generate.pwd"
import { omit , get } from "lodash";
import { nanoid } from "nanoid";

export async function userRegisterHandler(req: Request, res: Response){
    const isEmailExist = await emailExist(req.body);
    if (isEmailExist){
        req.body.is_verify = (req.body.method == "gmail") ? true : false; 
        const user = await createUser(req.body);
        
        //generate access token
        try{
            const user = await validatePassword(req.body);
            if (!user) {
                return res.status(200).send({
                    "status": "error",
                    "message": message.msg4
                });
            }
            
            // Create a session
            const session = await createSession(user._id, req.get("user-agent") || "");
        
            // create access token
            const accessToken = createAccessToken({
                user, session
            });
            
            // create refresh token
            // const refreshToken = sign(session, {
            //     expiresIn: process.env.REFRESHTOKENTTL, // 1 year
            // });
            
            // send refresh & access token back
            return res.send({"status": "success", "message": message.msg6 , accessToken });
        } catch (error){
            return res.status(200).send({
                "status": "error",
                "messagse": error.message
            });
        }
    } else {
        return res.status(200).send({
            "status": "error",
            "message": message.msg3
        });
    }   
}

export async function userLoginHandler(req: Request, res: Response){
    const getMethod = await findUser({ email: req.body.email });
    if (getMethod){
        if (getMethod.method == req.body.method){
            try{
                const user = await validatePassword(req.body);
                
                if (!user) {
                    return res.status(200).send({
                        "status": "error",
                        "message": message.msg4
                    });
                }
                
                // Create a session
                const session = await createSession(user._id, req.get("user-agent") || "");
            
                // create access token
        
                const accessToken = createAccessToken({
                    user, session
                });
                
                // create refresh token
                // const refreshToken = sign(session, {
                //     expiresIn: process.env.REFRESHTOKENTTL, // 1 year
                // });
                
                // send refresh & access token back
                return res.send({"status": "success", "message": message.msg15 , accessToken });
            } catch (error){
                return res.status(200).send({
                    "status": "error",
                    "messagse": error.message
                });
            }
        } else {
            if (getMethod.method == "gmail"){
                return res.status(200).send({
                    "status": "error",
                    "message": message.msg32
                });
            } else if (getMethod.method == "email") {
                return res.status(200).send({
                    "status": "error",
                    "message": message.msg33
                });
            } else {
                return res.status(200).send({
                    "status": "error",
                    "message": message.msg20
                });   
            }
        }
    } else {
        return res.status(200).send({
            "status": "error",
            "message": message.msg20
        });    
    }
}

export async function userLogoutHandler(req: Request, res: Response){
    const sessionId = get(req, "user.session");
    await updateSession({ _id: sessionId }, { valid: false })
    return res.status(200).send({
        "status": "success",
        "message": message.msg5 
    })
}

export async function userForgotPassHandler(req: Request, res: Response){
    const getProfile = await findUser({ email: req.body.email });
    if (getProfile){
        if (getProfile.method == "email"){ 
            req.body.token = Math.floor(100000 + Math.random() * 900000);
            
            let mailRes = await sendMail(req.body.token, "Reset password OTP - taskOK", getProfile.email, "forgot");
            
            if (mailRes.messageId != undefined){
                const isUpdate = await findAndUpdate({ email : getProfile.email }, req.body, { new: true });
                if (isUpdate){
                    return res.status(200).send({"status": "success", "message": message.msg19});
                } else {
                    return res.status(200).send({"status": "error", "message": message.msg20});
                }
            } else {
                return res.status(200).send({"status": "error", "message": message.msg20});
            }
        } else {
            return res.status(200).send({"status": "error", "message": message.msg28});
        }
    } else {
        return res.status(200).send({"status": "error", "message": message.msg27});
    }
}

export async function userVerifyCodeHandler(req: Request, res: Response){
    const getData = await findUser({ email: req.body.email });
    if (getData){
        if (req.body.code == getData.token){
            req.body.token = Math.floor(100000 + Math.random() * 900000);
            await findAndUpdate({ _id : getData._id }, req.body, { new: true });
            return res.status(200).send({"status": "success", "message": message.msg31});
        } else {
            return res.status(200).send({"status": "error", "message": message.msg25});
        }
    } else {
        return res.status(200).send({"status": "error", "message": message.msg20});
    }
}

export async function userChangePassHandler(req: Request, res: Response){
    const getData = await findUser({ email: req.body.email });
    if (getData){
        // Replace the password with the hash
        req.body.password = await getPassword(req.body.password);

        const isUpdate = await findAndUpdate({ _id : getData._id }, req.body, { new: true });
        if (isUpdate){
            return res.status(200).send({"status": "success", "message": message.msg30});
        } else {
            return res.status(200).send({"status": "error", "message": message.msg20});
        }
    } else {
        return res.status(200).send({"status": "error", "message": message.msg20});
    }
}