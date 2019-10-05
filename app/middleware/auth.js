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

class Auth extends auth{
    constructor(){
        super()
        this.checkAuth = this.checkAuth.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.isMember = this.isMember.bind(this);
    }
    init(exp = 8){
        super.init(exp);
        this.state = {
            token : '',
            accepted : false,
        }
        this.token = '',
        this.accepted = false;
    }
    checkAuth(request, reply){
        const {authorization} = request.headers;
        this.token = authorization;
        const isValid = this.checkToken(authorization);
        if(isValid.status){
            this.accepted = true;
        } else {
            reply.status(403).send(isValid);
            this.accepted = false;
        }
        return this;
    }
    isAdmin(){
        if(this.accepted){
            const acceptedUser = ['admin', 'super_admin'];
            const data = this.extractor(this.token)
            if(acceptedUser.includes(data.status)){
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    isMember(){
        if(this.accepted){
            const acceptedUser = ['admin', 'super_admin'];
            const data = this.extractor(this.token)
            if(!acceptedUser.includes(data.status)){
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}

module.exports = Auth;