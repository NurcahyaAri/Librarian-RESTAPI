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
        this.isMember = this.isMember.bind(this);
    }
    init(exp = 8){
        super.init(exp);
        this.token = '',
        this.accepted = false;
    }
    isAccepted(){
        return this.accepted;
    }
    checkAuth(request, reply){
        const {authorization} = request.headers;
        this.token = authorization;
        const isValid = this.checkToken(authorization);
        if(isValid.status){
            const data = this.extractor(this.token);
            const admins = ['super_admin', 'admin'];
            if(admins.includes(data.status)){
                this.accepted = true;
            } else {
                this.accepted = false;
            }
        } else {
            reply.status(403).send(isValid);
            this.accepted = false;
        }
        return this;
    }
    isLibrarian(){
        if(this.accepted){
            const acceptedUser = ['librarian'];
            const data = this.extractor(this.token)
            if(acceptedUser.includes(data.status)){
                this.accepted = true;
            } else {
                if(!this.accepted){
                    this.accepted = false;
                }
            }
        }
        return this;
    }
    isMember(){
        if(this.accepted){
            const acceptedUser = ['member'];
            const data = this.extractor(this.token)
            if(!acceptedUser.includes(data.status)){
                this.accepted = true;
            } else {
                if(!this.accepted){
                    this.accepted = false;
                }
            }
        }
        return this;
    }
}

module.exports = Auth;