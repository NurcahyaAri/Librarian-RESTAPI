const AuthRouter = require('./router/AuthRouter');
const BookRouter = require('./router/BookRouter');
const UserRouter = require('./router/UserRouter');
module.exports = function (fastify, opts, next) {
    fastify.get('/', async (request, reply) => {
        return "Hello World";
    })
    fastify.register(AuthRouter, {prefix : 'auth'});
    fastify.register(BookRouter, {prefix : 'api/books'});
    fastify.register(UserRouter, {prefix : "api/users"});
    /* how to write routes */ 
    // fastify.method(url, async (req, res) => {
    //     await middleware,
    //     await middleware,
    //     await controller
    // })
    /* OR */
    // fastify.register('', {prefix : 'v1'})
    next();
}