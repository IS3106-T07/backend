import {User} from '../models/user';

const verifyPassword = (req, res, next) => {
    const {email, password} = req.body;

    try {
        req.user = await User.findByEmail(email, password);
        next();
    } catch (e) {
        res.status(401).send(e);
    }
};

module.exports = {
    verifyPassword
};