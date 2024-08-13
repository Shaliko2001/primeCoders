import AuthService from './auth.service';
import { SuccessHandlerUtil } from '../utils';

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const loginResult = await AuthService.login(email, password);

      SuccessHandlerUtil.handleAdd(res, next, loginResult);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const refreshResult = await AuthService.refresh(refreshToken);
      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }
}
