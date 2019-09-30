const BooksController = require('../../app/controllers/BookController');
const AuthMiddleware = require('../../app/middleware/auth');
module.exports = async function(fastify, opt, next){
    fastify.get('/books', async (request, reply, next) => {
        await BooksController.getBooks(request, reply);
    });
    fastify.post('/books', async (request, reply, next) => {
        if(AuthMiddleware(request, reply)){
            await BooksController.insertBook(request, reply);
        }
    });
    // fastify.delete('/book/:id', async (request, reply) => {

    // });
    // fastify.put('/book/:id', async (request, reply) => {

    // })

    fastify.post('/books/category', async (request, reply, next) => {
        if(AuthMiddleware(request, reply)){
            await BooksController.insertBookCategory(request, reply);
        }
    })

    next();
}