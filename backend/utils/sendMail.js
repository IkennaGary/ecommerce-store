const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE, // Use 'gmail' as the service
  auth: {
    user: process.env.NODEMAILER_USER, // Your Gmail address
    pass: process.env.NODEMAILER_PASSWORD, // Your Gmail password
  },
});

// Send an email
const sendMail = async (to, subject, html) => {
  let mailOptions = {
    from: process.env.NODEMAILER_USER, // Sender address
    to: to, // List of receivers
    subject: subject, // Subject line
    // text: text, // Plain text body
    html: html, // Plain text body
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(`mail sent successfully sent to ${response.accepted[0]}`);
  } catch (error) {
    console.log("error sending mail", error);
  }
};

module.exports = sendMail;
