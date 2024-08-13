// NPM Modules
import express from 'express';

// Local Modules
import { Controller } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.post('/mail',
  Controller.sendMail);

router.put('/updateHomePageData/:key/:lang',
  Controller.updateHomePageData);
//TO DO
router.post('/deleteAllHomePageData',
  Controller.deleteAllHomePageData);
    
router.delete('/deleteOneHomePageData/:key/:lang',
  Controller.deleteOneHomePageData);
  
//TO DO

router.get('/getAllHomePageData',
  Controller.getAllHomePageData);



  



export default router;
