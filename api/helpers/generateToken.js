const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    return jwt.sign(
        {
            id: user.userId,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2h'
        }
    )
};

module.exports = {
    tokenSign
}