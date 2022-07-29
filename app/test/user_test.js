/* eslint-disable no-undef */
require('dotenv').config();
const argon2 = require('argon2');
const url = require('url');
const sinon = require('sinon');
const { users } = require('./fake_data');
const { pool } = require('../server/models/mysqlcon');
const { should, requester } = require('./set_up');

const expectedExpireTime = process.env.TOKEN_EXPIRE;

describe('user APIs', () => {
    /**
     * @SignUp
     */

    it('sign up', async () => {
        const user = {
            email: 'test@test.com',
            password: 'test',
        };

        const res = await requester.post('/api/1.0/user/signup').send(user);

        const { status, body } = res;

        const expectedResponse = {
            data: {
                access_token: body.data.access_token,
                access_expired: expectedExpireTime,
                user: {
                    id: 4,
                    email: 'test@test.com',
                },
            },
        };

        status.should.equal(200);
        body.should.deep.equal(expectedResponse);
    });
});
