const auth = require('../../config/auth/auth');

const checkAuth = (request, reply) => {
    const {token} = request.headers;
    const isValid = auth.checkToken(token);
    if(isValid.status){
        return true;
    }
    else {
        reply.status(403).send(isValid);
        return false;
    }

}

module.exports = checkAuth;