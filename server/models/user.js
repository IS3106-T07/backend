require('dotenv').load();
import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        validator: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    }
});

UserSchema.methods.generateAuthToken = async function () {
    const user = this;

    const access = 'auth';
    const uid = user._id.toHexString();

    const token = jwt.sign({access, uid}, process.env.NODE_SECRET);
    try {
        await user.update({token: token});
    } catch (e) {
        return Promise.reject(e);
    }

    return token;
};

UserSchema.methods.removeAuthToken = async function () {
    const user = this;
    try {
        await user.update({token: undefined});
    } catch (e) {
        return Promise.reject(e);
    }
};

UserSchema.statics.findByEmail = async function (email, password) {
    const User = this;

    if (!validator.isEmail(email)) {
        return Promise.reject('Invalid email');
    }

    try {
        const userFound = await User.findOne({email: email});
        if (!userFound) {
            return Promise.reject('User not found');
        }

        if (userFound.password !== password) {
            return Promise.reject('Password not correct');
        }

        return userFound;
    } catch (e) {
        return Promise.reject(e)
    }
};

UserSchema.statics.findByUid = async function (uid) {
    const User = this;

    if (!uid) {
        return Promise.reject('Invalid token');
    }

    try {
        const userFound = await User.findOne({_id: uid});

        if (!userFound) {
            return Promise.reject('Invalid token');
        }

        return userFound;
    } catch (e) {
        return Promise.reject(e);
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};