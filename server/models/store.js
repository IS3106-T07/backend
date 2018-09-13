require('dotenv').load();
import mongoose from 'mongoose';
import validator from 'validator';

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    open: {
        type: Boolean,
    }
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = {
    Store
};