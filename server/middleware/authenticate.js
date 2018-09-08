import {User} from '../models/user';

const verifyPassword = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const userFound = await User.findByEmail(email, password);
        req.user = userFound;

        next();
    } catch (e) {
        res.status(401).send(e);
    }
};

module.exports = {
    verifyPassword
};