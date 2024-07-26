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

  router.post('/inputEmail', UsersController.inputEmail);

  router.post('/forgotPassword', UsersController.forgotPassword)

export default router;
