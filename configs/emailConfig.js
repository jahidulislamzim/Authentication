const dotenv =  require('dotenv');
const nodemailer = require('nodemailer');



dotenv.config();


let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:  process.env.EMAIL_PORT,
    secure: true, //true for 465, false for other ports
    auth:{
        user: process.env.EMAIL_USER, // Admin Email ID
        pass: process.env.EMAIL_PASS, // Admin Email Password
    },
})


module.exports = transporter;