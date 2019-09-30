const BookModel = require('../models/Books');
const BookCategoryModel = require('../models/Book_category');
module.exports = {
    getBooks: async (request, reply) => {
        const Book = await BookModel
            .query()
        
        reply.status(200).send(Book);
    },
    insertBook : async (request, reply) => {
        // const {
        //     sku, 
        //     name, 
        //     author, 
        //     publisher, 
        //     price_buy, 
        //     stock, 
        //     category_fkid, 
        //     shelf_location
        // } = request.body;
        try{
            let success = await BookModel
                .query()
                .insert({
                    ...request.body,
                    created_at : new Date().getTime()
                });
            if(success){
                reply.status(203).send({
                    msg : "SUCCESS"
                })
            }
        }
        catch(e){
            reply.status(500).send({
                msg : e
            });
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
            reply.status(203).send({
                msg : "SUCCESS"
            });
        }
        reply.status(500);
    }
}