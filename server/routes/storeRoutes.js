import {
    createStore
} from '../controllers/storeController';
import {
    verifyToken
} from '../middleware/authenticate';

import express from 'expect';

const storeRouter = express.Router();

storeRouter.route('/store')
    .post(verifyToken, createStore);