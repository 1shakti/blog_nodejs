const jwt = require('jsonwebtoken');
const secret = '@432jgj@*(h((s((g))df//@fjshd';

const createTokenForUser = (user) => {
    const payload = {
        _id:user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    }
    return jwt.sign(payload,secret);
}

const validateToken = (token) => {
    return jwt.verify(token,secret);
}

module.exports = {
    createTokenForUser,
    validateToken
}