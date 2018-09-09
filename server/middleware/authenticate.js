require('dotenv').load();
import {User} from '../models/user';
import jwt from 'jsonwebtoken';

const verifyPassword = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        req.user = await User.findByEmail(email, password);
        next();
    } catch (e) {
        res.status(401).send(e);
    }
};

const verifyToken = async (req, res, next) => {
    const token = res.header('x-auth');

    if (!token) {
        return res.status(401).send('Auth token not found in header');
    }

    try {
        const {uid} = jwt.verify(token, process.env.NODE_SECRET);
        if (!uid) {
            return res.status(401).send('Invalid token');
        }
        req.user = await User.findByUid(uid);
        next();
    } catch (e) {
        return res.status(401).send(e);
    }
};

module.exports = {
    verifyPassword,
    verifyToken
};