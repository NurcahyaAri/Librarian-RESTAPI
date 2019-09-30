const authController = require('../../app/controllers/AuthController.js.js');

module.exports = async function (fastify, opts, next) {
    fastify.post('/login', async (request, reply, next) => {
        await authController.login(request, reply);
    })
    fastify.post('/logout', async(request, reply, next) => {
        await authController.logout(request, reply);
    })
    fastify.post('/checktoken', async(request, reply, next) => {
        await authController.checkToken(request, reply);
    })
    fastify.post('/refresh', async (request, reply, next) => {
        await authController.refreshToken(request, reply);
    })

    next();
}