const authController = require('../app/controllers/auth');

module.exports = function (fastify, opts, next) {
    fastify.get('/', async (request, reply) => {
        return {
            Hello : "This is Fastify Api"
        }
    })
    
    fastify.post('/login', async (request, reply) => {
        await authController.login(request, reply);
    })
    fastify.post('/check', async (request, reply) => {
        await authController.checkToken(request, reply);
    })
    fastify.post('/refresh', async (request, reply) => {
        await authController.refreshToken(request, reply);
    })
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