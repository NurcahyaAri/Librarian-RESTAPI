const AuthRouter = require('./router/AuthRouter');
const BookRouter = require('./router/BookRouter');
module.exports = function (fastify, opts, next) {
    fastify.get('/', async (request, reply) => {
        return {
            Hello : "This is Fastify Api"
        }
    })
    fastify.register(AuthRouter, {prefix : 'auth'});
    fastify.register(BookRouter, {prefix : 'api'});
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