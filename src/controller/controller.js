// Local Modules
import { Service } from '../services';
import { SuccessHandlerUtil } from '../utils';
import { UsersModel } from "../models"
// import ClientsManager from '../socket/clients-manager';
import config from "../config/variables.config" 

export default class Controller {
  static async sendMail(req, res, next) {
    try {
        const { name, email , text } = req.body;

      await Service.sendMail(name, email, text);
      SuccessHandlerUtil.handleList(res, next, { succes: true });
    } catch (error) {
      next(error);
    }
  }

  static async imageUpload(req, res, next) {
    try {
      const { file } = req;
      const { originalname, filename, path } = file;
      const dirname = config.HOST_OF_SERVER + path;
      res.json({
        originalname,
        filename,
        dirname,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }


static async updateHomePageData(req, res, next) {
  try {
      const updatedData = req.body;
      const params = req.params
      await UsersModel.updateHomePageData(updatedData,params);
      
      res.status(200).send({ message: 'Homepage data updated successfully' });
  } catch (error) {
      console.error('Error updating homepage:', error);
      res.status(500).send({ message: 'Failed to update homepage' });
  }
}


static async deleteAllHomePageData(req, res, next) {
  try {
      await UsersModel.deleteAllHomePageData();
      res.status(200).send({ message: 'All homepage data deleted successfully' });
  } catch (error) {
      console.error('Error deleting homepage:', error);
      res.status(500).send({ message: 'Failed to delete homepage' });
  }
}


static async deleteOneHomePageData(req, res, next) {
  try {
    const params = req.params
      await UsersModel.deleteOneHomePageData(params);
      res.status(200).send({ message: 'Section deleted successfully' });
  } catch (error) {
      console.error('Error deleting section:', error);
      res.status(500).send({ message: 'Failed to delete section' });
  }
}


static async getAllHomePageData(req, res, next) {
  try {
      const homePageData = await UsersModel.getAllHomePageData();
      res.status(200).json(homePageData);
  } catch (error) {
      console.error('Error fetching homepage data:', error);
      res.status(500).send({ message: 'Failed to fetch homepage data' });
  }
}

}


