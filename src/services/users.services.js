// Local Modules

import { UsersModel } from "../models";
import bcrypt from "bcryptjs"

export default class UsersServices {
  static register(result) {
     result.password = bcrypt.hashSync(result.password, 10);
     result.role = 'user';
     return UsersModel.register(result) 
  }
}
