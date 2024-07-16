// NPM Modules
import express from 'express';

// Local Modules
import { Controller } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.post('/mail',
  Controller.sendMail);

export default router;
