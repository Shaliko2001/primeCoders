import nodemailer from 'nodemailer';

// Local Modules

class Service {
    static async sendMail(name, email, text) {
      const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'armasatryan77@gmail.com',
          pass: 'qecpbrrmcegejdjd',
        },
      });
    
      const mailOptions = {
        from: 'armasatryan77@gmail.com',
        to: email,
        subject: 'Email',
        text: `From ${name}, ${email}, ${text}`,
      };
    
      return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, function (error, info) {
          if (error) {
            reject(error);
          } else {
            resolve('Email sent: ' + info.response);
          }
        });
      });
    }
  }

  export default Service;
  