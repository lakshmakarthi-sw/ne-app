import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendMail(otp: string, subject: string, to_addr: String, template: String) {

    let transporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465, //also we can use 587
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASS
        },
    });

     // send mail with defined transport object
    let info = await transporter.sendMail( (template == "email") ? {
        from: '"taskOk" <'+process.env.EMAILUSER+'>', // sender address
        to: to_addr.toLowerCase(), // list of receivers
        subject: subject, // Subject line
        text: "Hi,\n Welcome to taskOK. \n Use the OTP below to verify your email address. \n"+otp+"\n Thanks,\n taskOK Team.\n © 2021 taskOK. All rights reserved.", // plain text body
        html: "<p style='margin: 5px 0px; color: black;'>Hi,</p><p style='margin: 3px 0px; color: black;'>Welcome to taskOK.</p><p style='margin: 2px 0px; color: black;'>Use the OTP below to verify your email address.</p><p style='margin: 5px 0px; color: black;'><strong>"+otp+"</strong></p><p style='margin: 2px 0px; color: black;'>Thanks,</p><p style='margin: 2px 0px; color: black;'>taskOK Team.</p><p style='margin: 2px 0px; color: black;'>© 2021 taskOK. All rights reserved.</p>", // html body
    } : {
        from: '"taskOk" <'+process.env.EMAILUSER+'>', // sender address
        to: to_addr.toLowerCase(), // list of receivers
        subject: subject, // Subject line
        text: "Hi,\n You recently requested to reset your password. \n Use the OTP below to reset it. \n"+otp+"\n Thanks,\n taskOK Team.\n © 2021 taskOK. All rights reserved.", // plain text body
        html: "<p style='margin: 5px 0px; color: black;'>Hi,</p><p style='margin: 3px 0px; color: black;'>You recently requested to reset your password.</p><p style='margin: 2px 0px; color: black;'>Use the OTP below to reset it.</p><p style='margin: 5px 0px; color: black;'><strong>"+otp+"</strong></p><p style='margin: 2px 0px; color: black;'>Thanks,</p><p style='margin: 2px 0px; color: black;'>taskOK Team.</p><p style='margin: 2px 0px; color: black;'>© 2021 taskOK. All rights reserved.</p>", // html body
    }).catch((error) => {
        return error;
    });
    return info;
}