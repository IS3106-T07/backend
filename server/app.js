require('dotenv').load();

// setup mongodb connection
require('./models/mongoose');
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';
//const swaggerDocument = YAML.load('../swagger.yml');


import express from 'express';
import bodyParser from 'body-parser';

import {userRouter} from './routes/userRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/', userRouter);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Started on port ${process.env.NODE_PORT}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// export app for testing
module.exports = {
    app
};