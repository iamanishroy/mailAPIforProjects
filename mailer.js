const nodemailer = require("nodemailer");

module.exports = async (name, email, password, to, subject, body) => {
  // create reusable transporter object using the default SMTP transport
  console.log(email, password)
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${name}" ${email}`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: body, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// main().catch(console.error);
