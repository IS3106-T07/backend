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

UserSchema.method.generateToken = function() {
    const user = this;
    const access = 'auth';
    const uid = user._id.toHexString();

    const token = jwt.sign({access, uid}, process.env.NODE_SECRET);
    user.token = token;

    return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};