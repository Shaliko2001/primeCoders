// NPM Modules
import express from 'express';

// Local Modules
import { Controller } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';
import {ImageUploadMiddleware} from "../middlewares/image-upload.middleware"
const router = express.Router();

router.post('/mail',
  Controller.sendMail);

// image Upload -----------------------------------------------------------
router.post("/imageUpload", ImageUploadMiddleware.upload(),Controller.imageUpload)
// ------------ -----------------------------------------------------------

router.put('/updateHomePageData/:key/:lang',
  Controller.updateHomePageData);


// Dont use this method ------------------------------------------
router.post('/deleteAllHomePageData',
  Controller.deleteAllHomePageData);
// Dont use this method ------------------------------------------

    
router.delete('/deleteOneHomePageData/:key/:lang',
  Controller.deleteOneHomePageData);
  
// ready
router.get('/getAllHomePageData',
  Controller.getAllHomePageData);


export default router;
