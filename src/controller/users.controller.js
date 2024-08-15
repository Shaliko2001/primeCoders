// Local Modules
import { UsersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
import fs from "fs"
// import ClientsManager from '../socket/clients-manager';

export default class UsersController {
  static async register(req, res, next) {
    try {
      const user = req.body;
      await UsersServices.register(user)
      SuccessHandlerUtil.handleList(res, next, { user });
    } catch (error) {
      next(error);
    }
  }

  static async login (req, res, next) {
      try {
        const { email, password } = req.body

        const user = await UsersServices.login(email, password)
        console.log(user);

        SuccessHandlerUtil.handleList(res, next, { user })
      } catch (error) {
        next(error)
      }
  }  
  
  static async setNewPass (req, res, next) {
      const data = req.body
      const userEmail = await UsersServices.setNewPass(data)
      SuccessHandlerUtil.handleList(res, next, userEmail)
  }

  
  static async forgotPassword (req, res, next) {
      try {
        const {email} = req.body
        const result = await UsersServices.forgotPassword(email);
        console.log(result);
        
        SuccessHandlerUtil.handleList(res, next,result)
      } catch (error) {
         next(error)
      }
  }

  static async getHomePage(req, res, next) {
    try {
      const {lang} = req.params
      const result  = await UsersServices.getHomePage(lang)
        SuccessHandlerUtil.handleList(res, next, result);
      } 
     catch (error) {
        console.error('Error fetching homepage data:', error);
       next(error);
    }
  }

  static async saveGoogleLoginData (req, res, next) {
    try {
       const user = req.user
      //  console.log(user);
       
       const { name, emails } = user
       const userEmail = emails[0].value
       const { familyName, givenName } = name
       console.log(userEmail, familyName, givenName);
       
       await UsersServices.saveGoogleLoginData(familyName, givenName, userEmail)
       res.redirect("/api/v1/users/homepage")
    } catch (error) {
        next(error)
    }
}


}
