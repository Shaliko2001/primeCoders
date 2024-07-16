import express from 'express';

import auth from './auth.api';
import users from './users.api';
import api from './admin.js';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/api', api);


export default app;
