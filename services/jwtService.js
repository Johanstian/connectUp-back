const JWT = require('jwt-simple');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_TOKEN_PASSWORD;

const createToken = (user) => {
    const payload = {
        userId: user._id,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix()
    }
    return JWT.encode(payload, secretKey);
};

module.exports = { secretKey, createToken }