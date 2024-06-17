import nodemailer from "nodemailer";
import { env } from "$env/dynamic/private";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.GOOGLE_EMAIL,
    pass: env.GOOGLE_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
export default transporter;
