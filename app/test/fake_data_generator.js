require('dotenv').config();
const argon2 = require('argon2');
const { pool } = require('../server/models/mysqlcon');
const { users } = require('./fake_data');

const { NODE_ENV } = process.env;

async function hashPassword(password) {
    const hash = await argon2.hash(password);
    return hash;
}

async function createFakeUsers(conn) {
    const encryptedUsers = await Promise.all(users.map(async (user) => {
        const { provider, email, password } = user;
        const hash = await hashPassword(password);
        return {
            provider,
            email,
            password: hash,
        };
    }));
    await conn.query('INSERT INTO user (provider, email, password) VALUES ?', [encryptedUsers.map((user) => Object.values(user))]);
}

async function createFakeData() {
    if (NODE_ENV !== 'test') {
        console.error('createFakeData only runs in test env');
        return;
    }
    const conn = await pool.getConnection();
    await conn.query('START TRANSACTION');
    await conn.query('SET FOREIGN_KEY_CHECKS = ?', 0);
    await createFakeUsers(conn);
    await conn.query('SET FOREIGN_KEY_CHECKS = ?', 1);
    await conn.query('COMMIT');
    await conn.release();
    console.log('createFakeData finished');
}

async function truncateFakeData() {
    if (NODE_ENV !== 'test') {
        console.error('truncateFakeData only runs in test env');
        return;
    }

    async function truncateTable(table) {
        const conn = await pool.getConnection();
        await conn.query('START TRANSACTION');
        await conn.query('SET FOREIGN_KEY_CHECKS = ?', 0);
        await conn.query(`TRUNCATE TABLE ${table}`);
        await conn.query('SET FOREIGN_KEY_CHECKS = ?', 1);
        await conn.query('COMMIT');
        await conn.release();
    }

    const tables = ['user'];
    await Promise.all(tables.map(async (table) => {
        await truncateTable(table);
    }));
}

async function closeConnection() {
    await pool.end();
}

async function main() {
    await truncateFakeData();
    await createFakeData();
    await closeConnection();
}

// execute when called directly.
if (require.main === module) {
    main();
}

module.exports = {
    createFakeData,
    truncateFakeData,
    closeConnection,
};
