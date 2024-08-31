import { FilterQuery } from "mongoose";
import Settings  from "../models/settings.model";
import { SettingsDocument } from "../interfaces/settings.interface";

export async function findSettings(query: FilterQuery<SettingsDocument>) {
    return Settings.findOne(query).lean();
}

export async function findArrayMatches(query: FilterQuery<SettingsDocument>, query1: FilterQuery<SettingsDocument>) {
    return Settings.findOne(query, query1).lean();
}

export async function insertSession(query: FilterQuery<SettingsDocument>) {
    const session = await Settings.create(query);
    return session.toJSON();
}