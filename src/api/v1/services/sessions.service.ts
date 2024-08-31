import { SessionsDocument } from "../interfaces/sessions.interface";
import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import { UsersDocument } from "../interfaces/users.interface";
import { sign, decode } from "../utils/jwt.util";
import Session from "../models/sessions.model";
import { findUser } from "./users.service";
import { get } from "lodash";
import dotenv from "dotenv";

dotenv.config();

export function createAccessToken({
  user,
  session
}: {
  user:
    | Omit<UsersDocument, "password">
    | LeanDocument<Omit<UsersDocument, "password">>;
  session:
    | Omit<SessionsDocument, "password">
    | LeanDocument<Omit<SessionsDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: process.env.ACCESSTOKENTTL }
  );
  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
    // Decode the refresh token
    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, "_id")) return false;

    // Get the session
    const session = await Session.findById(get(decoded, "_id"));

    // Make sure the session is still valid
    if (!session || !session?.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = createAccessToken({ user, session });

    return accessToken;
}

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
}
  
export async function updateSession(
    query: FilterQuery<SessionsDocument>,
    update: UpdateQuery<SessionsDocument>
) {
    return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionsDocument>) {
    return Session.find(query).lean();
}

export async function findSession(query: FilterQuery<UsersDocument>) {
  return Session.findOne(query).lean();
}