const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.EMAIL_PASSWORD,
    },
  });

  // email options
  const mailOptions = {
    from: "Melos",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // email sender
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
