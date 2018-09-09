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
    const token = await req.user.generateAuthToken();
    res.header('x-auth', token).send(req.user);
};

const signOutUser = async (req, res) => {
    await req.user.removeAuthToken();
    res.status(200).send('User signed out');
};

module.exports = {
    signUpUser,
    signInUser,
    signOutUser
};