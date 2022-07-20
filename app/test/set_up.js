/* eslint-disable no-undef */
require('dotenv').config();
const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chaiHttp = require('chai-http');

const app = require('../app');
const { truncateFakeData, createFakeData } = require('./fake_data_generator');

const { NODE_ENV } = process.env;

chai.use(chaiHttp);
chai.use(deepEqualInAnyOrder);
chai.should();

const { assert } = chai;
const { expect } = chai;
const requester = chai.request(app).keepOpen();

before(async () => {
    if (NODE_ENV !== 'test') {
        console.log('automation test only runs in test env');
        return;
    }
    await truncateFakeData();
    await createFakeData();
});

module.exports = {
    expect,
    assert,
    requester,
};
