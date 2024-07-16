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
          // company mail
          user: 'armasatryan77@gmail.com',
          pass: 'qecpbrrmcegejdjd',
        },
      });
    
      const mailOptions = {
        // company mail
        from: 'armasatryan77@gmail.com',
        to: 'armasatryan77@gmail.com',
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
  