import mongoose from "mongoose";
import { SettingsDocument } from "../interfaces/settings.interface";

const SettingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    value: [{
      name: {type: String, required: false},
      state: {type: String, required: false},
      ccode: {type: String, required: false},
      code: {type: String, required: false},
      dial_code: {type: String, required: false}
    }]
  }
);

const Settings = mongoose.model<SettingsDocument>("settings", SettingsSchema);
export default Settings;
