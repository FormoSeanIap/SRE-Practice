require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const dayjs = require('dayjs');
const { promisify } = require('util');

const { TOKEN_SECRET, TOKEN_EXPIRE } = process.env;

function getCurrentTime() {
    return dayjs().format();
}

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            console.error(err);
            next(err);
        }
    };
}

async function generateAccessToken(user) {
    const accessToken = await promisify(jwt.sign)(
        user,
        TOKEN_SECRET,
        { expiresIn: TOKEN_EXPIRE },
    );
    return {
        accessToken,
        accTokenExp: TOKEN_EXPIRE,
    };
}

async function checkAccessToken(token) {
    try {
        return await promisify(jwt.verify)(token, TOKEN_SECRET);
    } catch (err) {
        return false;
    }
}

async function hashPassword(password) {
    const hashResult = await argon2.hash(password);
    return hashResult;
}

async function checkPassword(password, hash) {
    const verifyResult = await argon2.verify(hash, password);
    return verifyResult;
}

const signUpSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(4).max(30),
});

module.exports = {
    getCurrentTime,
    asyncHandler,
    generateAccessToken,
    checkAccessToken,
    hashPassword,
    checkPassword,
    signUpSchema,
};
