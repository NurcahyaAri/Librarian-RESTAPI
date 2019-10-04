const BookModel = require('../models/Books');
const BookCategoryModel = require('../models/Book_category');
const MvUpload = require('../helpers/Upload').move;
const auth = require('../../config/auth/auth');
module.exports = {
    getBooks: async (request, reply) => {
        let {page, limit, id} = request.query;
        let currentPage = 0;
        page = parseInt(page);
        limit = parseInt(limit);
        if(limit){
            currentPage = page * limit;
        }
        console.log(currentPage);
        let Book = undefined;
        
        if(id){
            try{
                Book = await BookModel
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
            Book = await BookModel
                .query()
                .offset(currentPage)
                .limit(limit)
        } else {
            Book = await BookModel
                .query()
        }
        reply.status(200).send({
            total : Book.length,
            page : page,
            limit : limit ? limit : Book.length,
            data : Book
        });
    },
    insertBook : async (request, reply) => {
        try{
            let payload = auth.extractor(request.headers.authorization);
            let newDir = MvUpload(request, request.file.filename, payload.sub, "books");
            let success = await BookModel
                .query()
                .insert({
                    ...request.body,
                    photo_url : newDir,
                    created_at : new Date().getTime()
                });
            
            if(success){
                reply.status(201).send({
                    msg : "SUCCESS"
                })
            }
            else {
                throw "ERROR_WHILE_INSERT";
            }
        }
        catch(e){
            console.log(e);;
            reply.status(500).send({
                msg : e
            });
        }
    },
    deleteBook : async (request, reply) => {
        try{
            const {id} = request.params;
            let success = await BookModel
                .query()
                .delete()
                .where('book_id', '=', id);
            if(success){
                reply.status(200).send({
                    msg : "SUCCESS"
                })
            }
            else {
                throw "ERROR_WHILE_DELETE";
            }
        } catch(e){
            reply.status(500).send({
                msg : e
            })
        }
    },
    updateBook : async (request, reply) => {
        try{
            const {id} = request.params;
            try{
                let payload = auth.extractor(request.headers.authorization);
                let newDir = MvUpload(request, request.file.filename, payload.sub, "books");
            } catch(e){
                console.log("NO_NEW_PHOTO");    
            }
            console.log(id);
            console.log(request.body);
            // delete request.body.book_id;
            let success = await BookModel
                .query()
                .update({
                    ...request.body
                })
                .where("book_id", "=", id);
            if(success){
                reply.status(200).send({
                    msg : "SUCCESS"
                })
            }
            else {
                throw "ERROR_WHILE_UPDATE";
            }
        } catch(e){
            reply.status(500).send({
                msg : 500
            })
        }
    },
    insertBookCategory : async (request, reply) => {
        console.log("HEllo");
        const { name } = request.body;
        let success = await BookCategoryModel
            .query()
            .insert({
                name : name,
                created_at : new Date().getTime()
            })
        if(success){
            reply.status(201).send({
                msg : "SUCCESS"
            });
        }
        reply.status(500);
    }
}