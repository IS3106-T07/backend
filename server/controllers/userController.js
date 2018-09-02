import {User} from '../models/user';
const createUser = async (req, res) => {
    const {name, email, password, phone} = req.body;
    const user = new User({name, email, password, phone});

    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
};

module.exports = {
    createUser
};