require('dotenv').load();

import express from 'express';
import bodyParser from 'body-parser';

import {userRouter} from './routes/userRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/', userRouter);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Started on port ${process.env.NODE_PORT}`);
});