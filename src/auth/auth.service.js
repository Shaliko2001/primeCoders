import jwt from 'jsonwebtoken';
import { UsersModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';

import config from '../config/variables.config';

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET
} = AUTH;

const { InputValidationError, UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET);
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET);

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static async refresh(token) {
    const user = AuthService.validateRefreshToken(token);

    const { accessToken, refreshToken } = AuthService.generateTokens(user);

    const payload = {
      accessToken,
      refreshToken,
      ...user
    };
    return payload;
  }

  static async login(email, password) {
    const user = await UsersModel.findByEmailAdmin(email);
    console.log(user);
    if (!user) throw new InputValidationError('Invalid email or password');
    if (!CryptoUtil.isValidPassword(password, user[0].password)) {
      throw new InputValidationError('Invalid email or password');
    }
    console.log(user);

    delete user[0].password;

    const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

    const payload = {
      id : user[0].id,
      name: user[0].name,
      surname : user[0].surname,
      picture: user[0].picture,
      role : user[0].role,
      email : user[0].email,
      created_at : user[0].created_at,
      accessToken,
      refreshToken
    };

    console.log(payload);
    return payload;
  }
}
