require('dotenv').load();
import request from 'supertest';
import {assert} from 'chai';

import {app} from '../../server/app';
import {User} from '../../server/models/user';
import {dummyUsers} from '../storage/mockUsers';
import {postUsers} from '../helpers/api'

describe('Account API integration tests', async () => {
    let testServer;
    let testUser;

    before(async () => {
        testServer = request(app);
    });

    beforeEach(async () => {
        // remove all existing documents in User collection
        await User.remove({});

        // insert dummy users into the User collection
        try {
            await User.insertMany(dummyUsers);
        } catch (e) {
            console.log(`Insert dummy users error: ${e}`);
        }
    });

    after(async () => {
        await User.remove({});
    });

    it.only('should get 200 for creating a new user', async () => {
        testUser = {
            name: 'new test user',
            email: 'newTestUser@gmail.com',
            password: 'password',
            phone: '88888888'
        };

        const response = await postUsers(testServer, testUser);
        assert.equal(response.status, '200', 'failed to create user');

        const {name} = await User.findOne({email: testUser.email});
        assert.equal(name, testUser.name, 'testUser object is not the same as db data');
    });

    it('should get 400 if the user email is not unique in db', async () => {
        testUser = {
            name: 'new test user',
            email: 'user1@gmail.com',
            password: 'password',
            phone: '88888888'
        };

        const response = await postUsers(testServer, testUser);
        assert.equal(response.status, '400');

        console.log(JSON.stringify(response.body, undefined, 2));
    });

    it('should get 400 if the user phone is not unique in db', async () => {
        testUser = {
            name: 'new test user',
            email: 'newTestUser2@gmail.com',
            password: 'password',
            phone: '12345678'
        };

        const response = await postUsers(testServer, testUser);
        assert.equal(response.status, '400');

        console.log(JSON.stringify(response.body, undefined, 2));
    });
});