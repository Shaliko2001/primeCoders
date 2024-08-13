// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/get',
  // AuthMiddleware.authenticate()
  
  );

  router.post("/register", UsersController.register);

  router.post('/login', UsersController.login);

  router.post('/setNewPass', UsersController.setNewPass);

  router.post('/forgotPassword', UsersController.forgotPassword);

  router.get('/gethomepage/:lang', UsersController.getHomePage);

  




export default router;
