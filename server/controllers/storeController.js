import {Store} from '../models/store';

const createStore = async (req, res) => {
    const {name} = req.body;
    const {_id} = req.user;
    console.log(_id);

    try {
        console.log('im here');
        // create a store schema
        const store = new Store({
            name,
            owner: _id,
            open: false
        });

        console.log(store);
        // save the store object into db
        await store.save();
        res.status(200).send(store);
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports = {
    createStore
};