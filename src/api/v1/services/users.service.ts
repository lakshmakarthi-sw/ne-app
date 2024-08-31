import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { UsersDocument } from "../interfaces/users.interface";
import Users from "../models/users.model";
import { omit } from "lodash";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(input: DocumentDefinition<UsersDocument>){
    try{
        return await Users.create(input);
    } catch(e) {
        throw new Error(e);
    }
}

export async function findUser(query: FilterQuery<UsersDocument>) {
  return Users.findOne(query).lean();
}

export function findAndUpdate(
  query: FilterQuery<UsersDocument>,
  update: UpdateQuery<UsersDocument>,
  options: QueryOptions
) {
  return Users.findOneAndUpdate(query, update, options);
}

export async function emailExist({email}:{
  email: UsersDocument["email"];
}){
  const user = await Users.findOne({ email });
  if (user) {
    return false;
  } else {
    return true;
  }
}

export async function validatePassword({ email,password}: {
    email: UsersDocument["email"];
    password: string;
  }) {
    const user = await Users.findOne({ email });
    if (!user) {
      return false;
    }
    const isValid = await user.comparePassword(password);  
    if (!isValid) {
      return false;
    }
    return omit(user.toJSON(), "password");
}
