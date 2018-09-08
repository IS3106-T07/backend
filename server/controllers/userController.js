import {User} from '../models/user';

const signUpUser = async (req, res) => {
    const {name, email, password, phone} = req.body;
    const user = new User({name, email, password, phone});

    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
};

const signInUser = async (req, res) => {
    const token = req.user.generateAuthToken();
    res.header('x-auth', token).send(req.user);
};

module.exports = {
    signUpUser,
    signInUser
};