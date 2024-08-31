import { object, string, ref } from "yup";
import { message } from "../../../config/constants";

export const profileUpdateValidator = object({
    body: object({
    }),
});

export const statusUpdateValidator = object({
    body: object({
        code: string().required(message.msg16)
    }),
});

export const changeAuthPassValidator = object({
    body: object({
        old_pass: string().required(message.msg23),
        new_pass: string().required(message.msg24).min(6, message.msg11)
    }),
});