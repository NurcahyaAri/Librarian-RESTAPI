const UserController = require('../../app/controllers/UsersController');
const AuthMiddleware = require('../../app/middleware/auth');
const Multer = require('../../app/helpers/Upload').upload;

module.exports = async (fastify, opts, next) => {
    fastify.register(Multer.contentParser);
    // fastify.get("/", async (request, reply) => {

    // })
    fastify.get("/", async (request, reply) => {
        if(AuthMiddleware(request, reply)){
            UserController.getUsers(request, reply);
        }
    })
    fastify.get("/profile/:id", async (request, reply) => {
        if(AuthMiddleware(request, reply)){
            UserController.getUserInfo(request, reply);
        }
    })
    fastify.post('/', {preHandler: Multer.none()}, async (request, reply) => {
        if(AuthMiddleware(request, reply)){
            UserController.insertUser(request, reply);
        }
    })
    fastify.patch('/', async (request, reply) => {

    })
    fastify.delete('/', async (request, reply) => {

    })
}