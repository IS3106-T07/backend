require('dotenv').load();
import mongoose from 'mongoose';

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
        required: true
    }
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = {
    Store
};