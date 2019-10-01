const auth = require('../../config/auth/auth');

const checkAuth = (request, reply) => {
    const {authorization} = request.headers;
    const isValid = auth.checkToken(authorization);
    if(isValid.status){
        return true;
    }
    else {
        reply.status(403).send(isValid);
        return false;
    }

}

module.exports = checkAuth;