import express from 'express';

import auth from './auth.api.js';
import users from './users.api.js';
import admin from './admin.js';


const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/admin', admin);



export default app;
