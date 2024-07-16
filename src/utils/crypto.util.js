import bCrypt from 'bcryptjs';

export default class CryptoUtil {
  /**
   * @param {string} password
   *  @return {string}
   * @description Creates hash password from a given string.
   */
  static createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  /**
   * @param {string} password
   * @param {string} hashPassword
   * @returns {boolean}
   * @description Compares string password with hash password.
   */
  static isValidPassword(password, hashPassword) {
    return bCrypt.compareSync(password, hashPassword);
  }
}
