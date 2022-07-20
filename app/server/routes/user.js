const router = require('express').Router();

const { USER_ROLE } = require('../../util/constants');
const { asyncHandler } = require('../../util/general');
// const { authentication } = require('../../util/auth_handler');

// router.route('/signup').post(asyncHandler(signUp));
// router.route('/signin').post(asyncHandler(signIn));
// router.route('/profile').get(authentication(USER_ROLE.All), asyncHandler(getProfile));

module.exports = router;
