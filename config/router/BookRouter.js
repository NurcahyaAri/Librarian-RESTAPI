const BooksController = require('../../app/controllers/BookController');
const AuthMiddleware = require('../../app/middleware/auth');
const Multer = require('../../app/helpers/Upload').upload;
module.exports = async function(fastify, opt, next){
    fastify.register(Multer.contentParser);
    fastify.get('/', async (request, reply, next) => {
        await BooksController.getBooks(request, reply);
    });
    fastify.post('/', {preHandler : Multer.single('photo')},async (request, reply, next) => {
        if(AuthMiddleware(request, reply)){
            await BooksController.insertBook(request, reply);
        }
    });
    fastify.delete('/:id', async (request, reply) => {
        if(AuthMiddleware(request, reply)){
            await BooksController.deleteBook(request, reply);
        }
    });
    // fastify.put('/book/:id', async (request, reply) => {

    // })

    fastify.post('/category', async (request, reply, next) => {
        if(AuthMiddleware(request, reply)){
            await BooksController.insertBookCategory(request, reply);
        }
    })

    next();
}