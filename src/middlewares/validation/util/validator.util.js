import { ErrorsUtil } from '../../../utils';

const { InputValidationError } = ErrorsUtil;

export default class ValidatorUtil {
  /**
   * @param {Object} req
   * @param {Object} schema
   * @param {Function} next
   * @description Validate input with given schema.
   */
  static validateArgs(req, schema, next) {
    const errors = Object.keys(schema).map((field) => {
      const currentSchema = schema[field];
      const input = req[field];
      const { value, error } = currentSchema.validate(input, schema, ValidatorUtil.OPTIONS);
      if (!error) req[field] = value;
      return error;
    }).filter((e) => e);

    if (errors.length > 0) {
      const message = errors.map((error) => error?.details[0]?.message).join('\n');
      return next(new InputValidationError(message));
    }
    return next();
  }
}

ValidatorUtil.OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
  convert: true
};
