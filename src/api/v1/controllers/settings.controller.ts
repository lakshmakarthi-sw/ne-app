import { omit } from "lodash";
import { Request, Response } from "express";
import { findSettings, findArrayMatches, insertSession } from "../services/settings.service";
import { message } from "../../../config/constants";
import { get } from "lodash";
import { stat } from "node:fs/promises";

export async function getCCodeHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "ccode" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getStateHandler(req: Request, res: Response){
    const country = get(req, "params.country");
    //const getData = await findArrayMatches({"name":"states"},{"value": {$elemMatch:{"ccode":country}}});
    const getData = await findSettings({ name: "states" });

    if (getData){
        var states =  getData["value"].filter(function(value) {
            return value.ccode == country;
        });
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": states
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getCityHandler(req: Request, res: Response){
    const state = get(req, "params.state");
    //const getData = await findArrayMatches({"name":"cities"},{"value": {$elemMatch:{"state": state_data}}});
    const getData = await findSettings({ name: "cities" });
    if (getData){
        var cities =  getData["value"].filter(function(value) {
            return value.state == state;
        });
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": cities
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getLanguagesHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "languages" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getMaritalStatusHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "marital_status" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getDevicesHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "devices" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getEducationsHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "educations" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getProficienciesHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "proficiencies" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getGenderHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "gender" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getSocialMediaHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "social_media" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function getAPHHandler(req: Request, res: Response){
    const getData = await findSettings({ name: "aph" });
    if (getData){
        return res.status(200).send({
            "status": "success", 
            "message": message.msg1, 
            "result": omit(getData, "_id", "name")["value"]
        });
    } else {
        return res.status(200).send({
            "status": "error", 
            "message": message.msg26 
        });
    }
}

export async function insertData(req: Request, res: Response){
    const getData = await insertSession(req.body);
    return res.status(200).send({
        "status": "success", 
        "message": "ss", 
    });
}

