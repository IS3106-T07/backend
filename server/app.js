require('dotenv').load();

// setup mongodb connection
require('./models/mongoose');
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
    userRouter
} from './routes/userRoutes';
import {
    storeRouter
} from './routes/storeRoutes'

const app = express();
app.use(bodyParser.json());
app.use(cors('http://localhost:8080'));
app.use('/', userRouter);
app.use('/', storeRouter);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Started on port ${process.env.NODE_PORT}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// export app for testing
module.exports = {
    app
};