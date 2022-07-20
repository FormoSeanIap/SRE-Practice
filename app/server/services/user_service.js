const { signUpSchema, hashPassword } = require('../../util/general');
const UserModel = require('../models/user_model');

const signUp = async (email, password) => {
    if (!email || !password) return { code: 31003 };

    try {
        await signUpSchema.validateAsync({ email, password });
    } catch (err) {
        return { code: 31001 };
    }

    // const userResult = await UserModel.getUserDetailByEmail(email);
    // if (userResult !== null) return { code: 31002 };
    // if (userResult && userResult.error) return { code: 10003 };

    const hashedPassword = await hashPassword(password);

    const user = {
        provider: 'native',
        email,
        password: hashedPassword,
    };

    const result = await UserModel.signUp(user);
    console.log(result);
    // TODO: if (result.error) return { code: 10003 };

    return {
        user: {
            ...user,
            id: result.insertId,
        },
    };
};

module.exports = {
    signUp,
};
