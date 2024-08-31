import { get } from "lodash";
import { message } from "../../../config/constants";
import { Request, Response, NextFunction } from "express";
import { findSession } from "../services/sessions.service"

const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = get(req, "user.session");
  if (session){
    const sessionData = await findSession({ _id: session });
    if (sessionData){
      if (sessionData.valid){
         return next();
      } else {
        return res.status(200).send({"status": "error", "message": message.msg7});
      }
    } else {
      return res.status(200).send({"status": "error", "message": message.msg7});
    }
  } else {
    return res.status(200).send({"status": "error", "message": message.msg7});
  }
};
export default authUser;