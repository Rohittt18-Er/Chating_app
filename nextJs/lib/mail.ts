// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// create reusable transporter object using the default SMTP transport
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendVerification = async (email: string, token: string) => {
  console.log(token);

  const confirmationLink = `http://localhost:3000/new-verification?token=${token}`;
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Confirm your email",
    html: `<p>click<a href="${confirmationLink}">here<a/> to confirm email<p/>`,
  });
};

//   const SENDMAIL = async (mailDetails:any, callback:any) => {
//     try {
//       const info = await transporter.sendMail(mailDetails)
//       callback(info);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   export default SENDMAIL;

// const message = "Hi there, you were emailed me through nodemailer"
// const options = {
//     from: "TESTING <sender@gmail.com>", // sender address
//     to: "someone@gmail.com", // receiver email
//     subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
//     text: message,
//     html:`<p>click<a href="${confirmationLink}">here<a/> to confirm email<p/>`,
// }
