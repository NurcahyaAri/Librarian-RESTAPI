const UserModel = require('../models/Users');
const auth = require('../../config/auth/auth');
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
                res.status(500).send({
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
    getUserInfo : async (request, reply) => {
        let jwtExtactor = await auth.extractor(request.headers.authorization);
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
        console.log(request);
        console.log(request.body);
        try{
            users = await UserModel
            .query()
            .insert({
                created_at : new Date().getTime(),
                ...request.body,
            })
        } catch(e){
            console.log("error");
            console.log(e);
            reply.status(500).send({
                ...e
            })
        } finally {
            reply.status(500).send({
                msg : 'SUCCESS'
            })
        }
        
    },
    deleteUser : async (request, reply) => {

    },
    updateUser : async (request, reply) => {

    }
}