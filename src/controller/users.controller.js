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
  
  static async inputEmail (req, res, next) {
      const { email } = req.body
      const userEmail = await UsersServices.inputEmail(email)
      SuccessHandlerUtil.handleList(res, next, { email : userEmail.email })
  }

  
  static async forgotPassword (req, res, next) {
      try {
        const { password1, password2, email } = req.body
        await UsersServices.forgotPassword(password1, password2, email)
        SuccessHandlerUtil.handleList(res, next, { message : "successfull updated password ..." })
      } catch (error) {
         next(error)
      }
  }
}
