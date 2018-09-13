import {Store} from '../models/store';

const createStore = async (req, res) => {
    const {name} = req.body;
    const {_id} = req.user;
    const store = new Store(name, _id, false);

    try {
        await store.save();
        res.status(200).send(store);
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports = {
    createStore
};