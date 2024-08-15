// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';
import passport from 'passport';


const router = express.Router();

router.get('/get',
  // AuthMiddleware.authenticate()
  
  );

  router.post("/register", UsersController.register);

  router.post('/login', UsersController.login);

  router.post('/setNewPass', UsersController.setNewPass);

  router.post('/forgotPassword', UsersController.forgotPassword);

  router.get('/gethomepage/:lang', UsersController.getHomePage);

  
  // #GOOGLE LOGIN
  router.get("/google/login", passport.authenticate("google", {scope : ["email", "profile"]}))

  router.get("/google/auth/callback", passport.authenticate("google", {failureRedirect : "/api/v1/users/google/login/failure"}), UsersController.saveGoogleLoginData)

  router.get("/homepage", UsersController.getHomePageArm)


export default router;
