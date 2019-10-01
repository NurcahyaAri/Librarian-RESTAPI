const auth = require('../../config/auth/auth');
const bcrypt = require('bcryptjs');

// init model
const AdminModel = require('../models/Admin');

auth.init(60)
module.exports = {
    login : async (req, res) => {
        const {username, password} = req.body;
        let admin = await AdminModel
            .query()
            .where('username', '=',username)
            .first()
            .limit(1);
        console.log(admin);
        if(admin){
            if(bcrypt.compareSync(password, admin.password)){
                let token = auth.generateToken(admin.admin_id, admin.user_type);
                res.send(token);
            }
        } else {
            res.status(402).send({
                msg : "ERR"
            });
        }
    },
    logout : (req, res) => {

    },
    checkToken : (req, res) => {
        const {authorization} = req.headers;
        let status = auth.checkToken(authorization);
        console.log(status);
        if(status === true){
            res.send("OK");
        } else {
            res.send(status);
        }
    },
    refreshToken : (req, res) => {
        const {refreshtoken} = req.headers;
        console.log(req.headers);
        console.log(refreshtoken);
        let token = auth.refreshToken(refreshtoken);
        res.send(token);
    }
}