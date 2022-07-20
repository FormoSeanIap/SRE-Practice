const UserService = require('../services/user_service');
const { generateAccessToken } = require('../../util/general');

const signUp = async (req, res) => {
    const { email, password } = req.body;

    const result = await UserService.signUp(email, password);

    const { code, user } = result;
    // if (code > 9999) {
    //     handleResponse(code, res);
    //     return;
    // }

    const { accessToken, accTokenExp } = await generateAccessToken({
        provider: 'native',
        email: user.email,
    });

    res.status(200).send({
        data: {
            access_token: accessToken,
            access_expired: accTokenExp,
            user: {
                id: user.id,
                email: user.email,
            },
        },
    });
};

/*
const signIn = async (req, res) => {
    const result = await UserService.signIn(req.body);

    const { code, user } = result;
    if (code > 9999) {
        handleResponse(code, res);
        return;
    }

    const { accessToken, accTokenExp } = await generateAccessToken({
        provider: req.body.provider,
        name: user.name,
        email: user.email,
    });

    res.status(200).send({
        data: {
            access_token: accessToken,
            access_expired: accTokenExp,
            login_at: user.login_at,
            user: {
                id: user.id,
                provider: user.provider,
                name: user.name,
                email: user.email,
            },
        },
    });
};
*/

module.exports = {
    signUp,
    // signIn,
};
