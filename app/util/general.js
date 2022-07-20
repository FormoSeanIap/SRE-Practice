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

module.exports = {
    asyncHandler,
};
