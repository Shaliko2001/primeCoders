// Local Modules
import { Service } from '../services';
import { SuccessHandlerUtil } from '../utils';
// import ClientsManager from '../socket/clients-manager';

export default class Controller {
  static async sendMail(req, res, next) {
    try {
        const { name, email , text } = req.body;
        // console.log(email, text, 'mail');

      await Service.sendMail(name, email, text);
      SuccessHandlerUtil.handleList(res, next, { succes: true });
    } catch (error) {
      next(error);
    }
  }
}
