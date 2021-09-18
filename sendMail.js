const nodemailer = require("nodemailer");

const SendMail = (mail_from, mail_to, mail_subject, mail_html, mail_filenaem, backup_path) => {
  const transporter = nodemailer.createTransport(YOUR_AUTH_TO_YOUR_MAILSERVER);
  var mailOptions = {
    from: mail_from,
    to: mail_to,
    subject: mail_subject,
    html: mail_html,
    attachments:[
        {
            filename: mail_filenaem,
            path: backup_path
        }
    ]
  };
  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      console.log(
        `NOT SEND ---> ${new Date(
          Date.now()
        )} - ${mail_to} - ${mail_subject} - ${mail_from} - ${err.message}`
      );
    }
    else {
      console.log(
          `SEND ---> ${new Date(
              Date.now()
          )} - ${mail_to} - ${mail_subject} - ${mail_from} - ${err.message}`
      );
    }
  })
};

module.exports = SendMail;
