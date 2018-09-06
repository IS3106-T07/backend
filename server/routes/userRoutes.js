import {
    signupUser
} from '../controllers/userController';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/signup')
    .post(signupUser);

module.exports = {
    userRouter
};