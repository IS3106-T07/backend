import {
    signUpUser,
    signInUser
} from '../controllers/userController';

import {
    verifyPassword
} from '../middleware/authenticate'

import express from 'express';

const userRouter = express.Router();

userRouter.route('/signup')
    .post(signUpUser)
    .post(verifyPassword, signInUser);

module.exports = {
    userRouter
};