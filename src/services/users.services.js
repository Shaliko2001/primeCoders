// Local Modules

import { UsersModel } from "../models";
import bcrypt from "bcryptjs";
import CryptoUtil from "../utils/crypto.util.js";


import nodemailer from "nodemailer"
import config from "../config/variables.config.js"
import dotenv from "dotenv"
dotenv.config()

export default class UsersServices {
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

    static async forgotPassword (password1, password2, email) {
        if (password1 !== password2) throw new Error("Check your passwords") 
        const hashedPassword = CryptoUtil.createHash(password1)  
        await UsersModel.forgotPassword(hashedPassword, email)  
    }
}
