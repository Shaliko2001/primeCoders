// Local Modules
import { UsersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
// import ClientsManager from '../socket/clients-manager';

export default class UsersController {
  static async register(req, res, next) {
    try {
      const user = req.body;
      const result = await UsersServices.register(user)
      SuccessHandlerUtil.handleList(res, next, { user });
    } catch (error) {
      next(error);
    }
  }
}
