const bcrypt = require('bcryptjs');

const UserModel = require('../models/Users');
const auth = require('../middleware/auth');
const Auth = new auth();
module.exports = {
    getUsers : async (request, reply) => {
        let {page, limit, id} = request.query;
        let currentPage = 0;
        page = parseInt(page);
        limit = parseInt(limit);
        if(limit){
            currentPage = page * limit;
        }
        let users = undefined;
        
        if(id){
            try{
                users = await UserModel
                    .query()
                    .where("book_id", "=", id)
                    .first()
                    .limit(1);
            }catch(e){
                reply.status(500).send({
                    status : "ERROR_FETCH_BY_ID",
                    msg : e
                }) 
            }
        }
        else if(limit){
            users = await UserModel
                .query()
                .offset(currentPage)
                .limit(limit)
        } else {
            users = await UserModel
                .query()
        }
        reply.status(200).send({
            total : users.length,
            page : page,
            limit : limit ? limit : users.length,
            data : users
        });
    },
    getUser : async (request, reply) => {
        const {id} = request.params;
        let user = undefined;
        try{
            user = await UserModel
                .query()
                .where('user_id', '=', id)
                .first()
                .limit(1);
            reply.status(200).send(user)
        } catch(e) {
            reply.status(500).send({
                msg : e
            })
        }
    },
    getProfile : async (request, reply) => {
        let jwtExtactor = await Auth.extractor(request.headers.authorization);
        let user = undefined;
        try{
            user = await UserModel
                .query()
                .where("user_id", "=", jwtExtactor.sub);
        } catch(e) {
            reply.status(500).send({
                msg : e
            })
        }
        reply.send(
            user
        )
    },
    insertUser : async (request, reply) => {
        let users = undefined;
        try{
            if(!request.body.password){
                throw "PASSWORD_CAN'T_EMPTY";
            }
            if(request.body.password !== request.body.repassword){
                throw "PASSWORD_DID'T_MATCH";
            }
            if(request.body.password){
                let salt = bcrypt.genSaltSync(12);
                request.body.password = bcrypt.hashSync(request.body.password, salt);
                delete request.body.repassword;
            }
            users = await UserModel
            .query()
            .insert({
                created_at : new Date().getTime(),
                ...request.body,
            })
            reply.status(201).send({
                status : 'SUCCESS',
            })
        } catch(e){
            console.log("error");
            console.log(e);
            reply.status(500).send({
                status : "ERROR",
                msg : e
            })
        }
        
    },
    deleteUser : async (request, reply) => {

    },
    updateUser : async (request, reply) => {

    }
}