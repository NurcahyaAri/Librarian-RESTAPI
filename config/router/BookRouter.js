const BooksController = require('../../app/controllers/BookController');
const auth = require('../../app/middleware/auth');
const Multer = require('../../app/helpers/Upload').upload;
const Auth = new auth();
module.exports = async function(fastify, opt, next){
    fastify.register(Multer.contentParser);
    fastify.get('/', async (request, reply, next) => {
        await BooksController.getBooks(request, reply);
    });
    fastify.post('/', {preHandler : Multer.single('photo')},async (request, reply, next) => {
        if(Auth.checkAuth(request, reply).isAccepted()){
            await BooksController.insertBook(request, reply);
        }
    });
    fastify.post('/category', async (request, reply, next) => {
        if(Auth.checkAuth(request, reply).isAccepted()){
            await BooksController.insertBookCategory(request, reply);
        }
    })
    fastify.delete('/:id', async (request, reply) => {
        if(Auth.checkAuth(request, reply).isAccepted()){
            await BooksController.deleteBook(request, reply);
        }
    });
    fastify.patch('/:id', {preHandler : Multer.single('photo')}, async (request, reply) => {
        if(Auth.checkAuth(request, reply).isAccepted()){
            await BooksController.updateBook(request, reply);
        }
    })

    next();
}