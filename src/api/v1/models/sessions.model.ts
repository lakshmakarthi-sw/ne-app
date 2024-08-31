import mongoose from "mongoose";
import { SessionsDocument } from "../interfaces/sessions.interface";

const SessionsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionsDocument>("sessions", SessionsSchema);
export default Session;
