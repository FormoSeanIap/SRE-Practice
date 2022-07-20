require('dotenv').config();
const mysql = require('mysql2/promise');

const env = process.env.NODE_ENV || 'production';
const multipleStatements = process.env.NODE_ENV === 'test';
const {
    DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_NAME_TEST, DB_PORT,
} = process.env;

const mysqlConfig = {
    production: {
        // for EC2 machine
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT,
    },
    development: {
        // for localhost development
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT,
    },
    test: {
        // for automation testing (command: npm run test)
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME_TEST,
        port: DB_PORT,
    },
};

const mysqlEnv = mysqlConfig[env];
mysqlEnv.waitForConnections = true;
mysqlEnv.connectionLimit = 20;

const pool = mysql.createPool(mysqlEnv, { multipleStatements });

module.exports = {
    mysql,
    pool,
};
