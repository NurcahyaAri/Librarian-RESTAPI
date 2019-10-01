const BookModel = require('../models/Books');
const BookCategoryModel = require('../models/Book_category');
const MvUpload = require('../helpers/Upload').move;
const auth = require('../../config/auth/auth');
module.exports = {
    getBooks: async (request, reply) => {
        let {page, limit} = request.query;
        let currentPage = 0;
        console.log(page);
        console.log(limit);
        if(limit){
            currentPage = parseInt(page) * parseInt(limit);
        }
        console.log(currentPage);
        let Book = undefined;
        
        if(limit){
            Book = await BookModel
                .query()
                .offset(currentPage)
                .limit(limit)
        } else {
            Book = await BookModel
                .query()
        }
        reply.status(200).send(Book);
    },
    insertBook : async (request, reply) => {
        try{
            let payload = auth.extractor(request.headers.authorization);
            let newDir = MvUpload(request, request.file.filename, payload.sub);
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
            const {book_id} = request.body;
            delete request.body.book_id;
            let success = await BookModel
                .query()
                .update({
                    ...request.body
                })
                .where("book_id", "=", book_id);
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