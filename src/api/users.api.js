// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/get',
  // AuthMiddleware.authenticate()
  
  );

  router.post("/register", UsersController.register)

export default router;
