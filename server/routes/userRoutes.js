import {
    signUpUser,
    signInUser,
    signOutUser
} from '../controllers/userController';
import {
    verifyPassword,
    verifyToken
} from '../middleware/authenticate'

import express from 'express';

const userRouter = express.Router();

userRouter.route('/signup')
    .post(signUpUser);

userRouter.route('/signin')
    .post(verifyPassword, signInUser);

userRouter.route('/signout')
    .delete(verifyToken, signOutUser);

module.exports = {
    userRouter
};