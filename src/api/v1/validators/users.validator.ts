import { object, string, ref } from "yup";
import { message } from "../../../config/constants";

export const registerValidator = object({
    body: object({
        email: string().email(message.msg8).required(message.msg9),
        password: string().required(message.msg10)
        .min(6, message.msg11),
        //.matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        confirm_password: string().oneOf(
        [ref("password"), null],
        message.msg12
        ),
        is_termed: string().required(message.msg14),
        method: string().required(message.msg13),
    }),
});

export const loginValidator = object({
    body: object({
        email: string().email(message.msg8).required(message.msg9),
        password: string().required(message.msg10),
        method: string().required(message.msg13)
    }),
});

export const forgotPassValidator = object({
    body: object({
        email: string().email(message.msg8).required(message.msg9)
    }),
});

export const optValidator = object({
    body: object({
        email: string().email(message.msg8).required(message.msg9),
        code: string().required(message.msg16)
    }),
});

export const changePassValidator = object({
    body: object({
        email: string().email(message.msg8).required(message.msg9),
        password: string().required(message.msg10)
        .min(6, message.msg11),
        confirm_password: string().oneOf(
        [ref("password"), null],
        message.msg12
        ),
    }),
});