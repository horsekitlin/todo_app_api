const nodemailer = require('nodemailer');

const {
  EMAIL_ACCOUNT,
  ENMAIL_PASSWORD,
} = process.env;

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_ACCOUNT,
    pass: ENMAIL_PASSWORD,
  },
});

const sendValidationEmail = (contentOptions) => {
  /**
   * contentOptions:
   * {
        from: 'demo server <demoserver@gmail.com>',
        to: 'Tomas <aaa@gmail.com>',
        subject: 'Validate Your Account',
        html: '<a target='_blank' href="https://google.com.tw">Validate Link</a>',
      }
   */
  return new Promise((resolve, reject) => {
    mailTransport.sendMail(
      contentOptions,
      function(err, info) {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      },
    );
  });
};

module.exports.sendValidationEmail = sendValidationEmail;