import {
    createuser
} from '../controllers/userController';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/users')
    .post(createuser);

module.exports = {
    userRouter
};