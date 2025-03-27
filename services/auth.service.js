require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

let currentSessionId;

const authenticate = (username, password) => {
    try {
        const validUsername = process.env.ADMIN_USERNAME;
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, saltRounds);

        if (username !== validUsername || !bcrypt.compareSync(password, hashedPassword)) {
            return { session_id: null, username: username, message: 'Authentication failed' };
        }

        const sessionId = crypto.randomBytes(32).toString('base64');
        currentSessionId = sessionId;
        return { session_id: sessionId, username: username, message: 'Authentication in process' };
    } catch (e) {
        throw new Error({ session_id: null, username: username,  message: 'Authentication failed', error: e});
    }
};

const getSessionId = () => {
    return currentSessionId;
}

module.exports = {
    authenticate,
    getSessionId,
};


