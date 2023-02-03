require('dotenv').config();
const nodemailer = require("nodemailer");

const sendEmail = async (options)=>{

const transporter = nodemailer.createTransport({
   host: 'smtp.sendgrid.net',
   port: 587,
   auth: {
       user: "testkeyabdou",
       pass: process.env.SENDGRID_API_KEY
   }

})
const mailOption ={
  from:"Ecommerce Abdou",
  to:options.email,
  subject:options.subject,
  text: options.message,
}
await transporter.sendMail(mailOption)
}

module.exports = sendEmail