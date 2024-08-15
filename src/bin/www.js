// Standard modules
import http from 'http';
import 'dotenv/config';
import 'regenerator-runtime';
import passport from "passport";
import Google from "passport-google-oauth20"
import Facebook from "passport-facebook"


// Modules from this project
import { LoggerUtil } from '../utils';
import App from '../app';

// Constants
import config from '../config/variables.config';
import { name } from '../../package.json';

const { PORT } = config;

const GoogleStrategy = Google.Strategy
const FacebookStrategy = Facebook.Strategy

passport.use(new GoogleStrategy({
      clientID : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET,
      callbackURL : "http://localhost:3030/api/v1/users/google/auth/callback"
    },

    (req, accessToken, refreshToken, profile, done) => {
        done(null, profile)
    }
))

passport.use(new FacebookStrategy({
    clientID: '494281899875874',
    clientSecret: '3cc7e91286b85f2fb666beaf098feda6',
    callbackURL: '/api/v1/users/facebook/auth/callback',
    profileFields : ['id', 'displayName', 'photos', 'email']
  },

  (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      
      done(null, accessToken)
  }
))

passport.serializeUser((profile, done) => {
  done(null, profile)
})

passport.deserializeUser((profile, done) => {
  done(null, profile)
})
const init = async () => {
  const server = http.createServer(App.app);
  App.init(server);

  const _onError = (error) => {
    LoggerUtil.error(error.message);
  };

  const _onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `${address.port}`;

    LoggerUtil.info(`${name} started:`);
    LoggerUtil.info(`\tPort: ${bind}`);
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`);
  };

  server.listen(PORT);
  server.on('error', _onError);
  server.on('listening', _onListening);
};

module.exports = init().catch(LoggerUtil.error);
