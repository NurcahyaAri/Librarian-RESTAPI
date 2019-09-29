const auth = require('../../config/auth/auth');

module.exports = {
    login : (req, res) => {
        auth.init(1)
        let token = auth.generateToken(1, 'admin');

        res.send(token);
    },
    checkToken : (req, res) => {
        const {token} = req.headers;
        let status = auth.checkToken(token);
        console.log(status);
        if(status === true){
            res.send("OK");
        } else {
            res.send(status);
        }
    },
    refreshToken : (req, res) => {
        auth.init()
        const {refreshToken} = req.body;
        let token = auth.refreshToken(refreshToken);
        res.send(token);
    }
}