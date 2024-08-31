import { Express, Request, Response } from "express";
import { requestValidator, authUser } from "../middlewares/index";
import { 
    userRegisterHandler, 
    userLoginHandler, 
    userLogoutHandler, 
    userForgotPassHandler, 
    userChangePassHandler,
    userVerifyCodeHandler 
} from "../controllers/users.auth.controller";
import { 
    userGetProfileHandler, 
    userUpdateEmailStatus, 
    userUpdateProfile, 
    userVerifyEmail, 
    userAuthChangePassHandler,
    deleteLanguageHandler
} from "../controllers/users.profile.controller";
import { 
    getCCodeHandler,
    getCityHandler,
    getStateHandler,
    getEducationsHandler,
    getDevicesHandler,
    getMaritalStatusHandler,
    getLanguagesHandler,
    getProficienciesHandler,
    getGenderHandler,
    getSocialMediaHandler,
    getAPHHandler,
    insertData
} from "../controllers/settings.controller";

import { 
    registerValidator,
    loginValidator,
    forgotPassValidator,
    changePassValidator,
    optValidator
} from "../validators/users.validator";
import {
    profileUpdateValidator, 
    statusUpdateValidator,
    changeAuthPassValidator
} from "../validators/profile.validator";

export default function(app: Express){
    //checking
    app.get("/api/v1/healthcheck", (req:Request, res:Response) =>  res.status(200).send({"status": "success", "message": "Api working"}));

    //users auth functions
    app.post("/api/v1/register", requestValidator(registerValidator), userRegisterHandler);
    app.post("/api/v1/login", requestValidator(loginValidator), userLoginHandler);
    app.post("/api/v1/change_password", requestValidator(changePassValidator), userChangePassHandler);
    app.post("/api/v1/fpass_verification_code", requestValidator(forgotPassValidator), userForgotPassHandler);
    app.post("/api/v1/fp_verify_code", requestValidator(optValidator), userVerifyCodeHandler);
    app.post("/api/v1/auth_change_password", requestValidator(changeAuthPassValidator), userAuthChangePassHandler);
    app.delete("/api/v1/logout", authUser, userLogoutHandler);

    //profile
    app.get("/api/v1/get_profile", authUser, userGetProfileHandler);
    app.put("/api/v1/update_profile", [authUser, requestValidator(profileUpdateValidator)], userUpdateProfile);
    app.post("/api/v1/send_verification_code", authUser, userVerifyEmail);
    app.put("/api/v1/email_verification", [authUser, requestValidator(statusUpdateValidator)], userUpdateEmailStatus);
    app.delete("/api/v1/delete_language/:langIndex", authUser, deleteLanguageHandler);

    //settings
    app.get("/api/v1/get_country_code", authUser, getCCodeHandler);
    app.get("/api/v1/get_states/:country", authUser, getStateHandler);
    app.get("/api/v1/get_cities/:state", authUser, getCityHandler);
    app.get("/api/v1/get_devices", authUser, getDevicesHandler);
    app.get("/api/v1/get_martial_status", authUser, getMaritalStatusHandler);
    app.get("/api/v1/get_languages", authUser, getLanguagesHandler);
    app.get("/api/v1/get_educations", authUser, getEducationsHandler);
    app.get("/api/v1/get_proficiencies", authUser, getProficienciesHandler);
    app.get("/api/v1/get_gender", authUser, getGenderHandler);
    app.get("/api/v1/get_social_media", authUser, getSocialMediaHandler);
    app.get("/api/v1/get_aph", authUser, getAPHHandler);
    app.post("/api/v1/insert_data", insertData);
    
    app.use((req, res, next) => {
        return res.status(404).send({"status":"error", "message": "Not found"});
    }); 

    // app.use((error, req, res, next) => {
    //     return res.status(500).send({"status":"error", "message": "500"});
    // });
}