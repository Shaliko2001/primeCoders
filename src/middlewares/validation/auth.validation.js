import { AuthSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class AuthValidation {
  static validateLoginArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.loginSchema, next);
  }
}

export default AuthValidation;
