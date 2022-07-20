const { pool } = require('./mysqlcon');

const signUp = async (user) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');
        const [result] = await conn.query('INSERT INTO user SET ?', user);
        await conn.commit();
        return result;
    } catch (err) {
        console.error(err);
        await conn.query('ROLLBACK');
        // TODO: throw new DBConnectionError();
    } finally {
        await conn.release();
    }
};

module.exports = {
    signUp,
};
