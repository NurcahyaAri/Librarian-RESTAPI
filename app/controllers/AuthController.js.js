const auth = require('../../config/auth/auth');
const bcrypt = require('bcryptjs');

// init model
const AdminModel = require('../models/Admin');
const UserModel = require('../models/Users');

auth.init(60)
module.exports = {
    login : async (req, res) => {
        const {username, password} = req.body;
        let admin = undefined;
        let user = undefined;
        try{
            admin = await AdminModel
                .query()
                .where('username', '=',username)
                .first()
                .limit(1);
            if(admin){
                if(bcrypt.compareSync(password, admin.password)){
                    let token = auth.generateToken(admin.admin_id, admin.user_type);
                    return res.send(token);
                }
            } else {
                user = await UserModel
                    .query()
                    .where("username", "=", username)
                    .first()
                    .limit(1);
                if(user){
                    if(bcrypt.compareSync(password, user.password)){
                        let token = auth.generateToken(user.user_id, "member");
                        return res.send(token);
                    }
                }
                else {
                    throw "NO_MATCH_USERS";
                }
            }
        } catch (e){
            return res.status(402).send({
                ...e
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