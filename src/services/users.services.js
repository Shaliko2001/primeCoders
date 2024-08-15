// Local Modules

import { UsersModel } from "../models";
import bcrypt from "bcryptjs";
import CryptoUtil from "../utils/crypto.util.js";


import nodemailer from "nodemailer"
import config from "../config/variables.config.js"
import dotenv from "dotenv"
dotenv.config()

export default class UsersServices {
  static x = 7
    static register(result) {
      
      result.password = bcrypt.hashSync(result.password, 10);
      result.role = 'user';
      result.created_at = new Date().toISOString()
      return UsersModel.register(result)
    }

    static async login (email, password) {
       console.log(password);
       const user = await UsersModel.login(email)
       const validPassword = CryptoUtil.isValidPassword(password, user.password)

       if(!user) return new Error("Invalid email")
       if(!validPassword) return new Error("Invalid password")

       delete user.password
       return user 
    } 

    static async inputEmail (email) {
      const users = await UsersModel.inputEmail(email)
      if (String(users) === '[]') throw new Error("Invalid Email")

      const transporter = await nodemailer.createTransport({
         service : "gmail",
         auth : {
            user : config.GOOGLE_CONFIG.EMAIL,
            pass : config.GOOGLE_CONFIG.APP_PASSWORD,
            clientId : config.GOOGLE_CONFIG.CLIENT_ID,
            clientSecret : config.GOOGLE_CONFIG.CLIENT_SECRET
         }
      }) 
      
      const options = {
        from : config.GOOGLE_CONFIG.EMAIL,
        to : config.GOOGLE_CONFIG.EMAIL,
        subject : "Forgot Password?",
        text : "Recover your password with cliking to this link ...",
        html : '<a href="http://localhost:3030/api/v1/users/forgotPassword">forgot password page ...</a>'
      }

      await transporter.sendMail(options)

      return users[0]
    }

    static  forgotPassword ( email) {
        // if (password1 !== password2) throw new Error("Check your passwords") 
        // const hashedPassword = CryptoUtil.createHash(password1)  
function sendMail(){
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
    text: `${UsersModel.x}`,
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
sendMail()

        return UsersModel.forgotPassword(email)  

    }


    static  getHomePage (lang) {

      return UsersModel.getHomePage(lang)  
  }
  static setNewPass(data) {


  
  return UsersModel.setNewPass(data)  

}
  // GMAIL AUTH

  static async saveGoogleLoginData (name, surname, userEmail) {
    await UsersModel.saveGoogleLoginData(name, surname, userEmail)
  }

  static async getHomePageArm () {
      return await UsersModel.getHomePageArm()    
  }
    
}
