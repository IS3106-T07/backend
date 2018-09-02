import {
    createUser
} from '../controllers/userController';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/users')
    .post(createUser);

module.exports = {
    userRouter
};