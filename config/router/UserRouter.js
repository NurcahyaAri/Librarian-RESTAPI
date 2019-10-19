const UserController = require('../../app/controllers/UsersController');
const auth = require('../../app/middleware/auth');
const Multer = require('../../app/helpers/Upload').upload;
const Auth = new auth()
module.exports = async (fastify, opts, next) => {
    fastify.register(Multer.contentParser);

    fastify.get("/", async (request, reply) => {
        if(Auth.checkAuth(request, reply).isAccepted()){
            UserController.getUsers(request, reply);
        }
    });
    fastify.post('/', {preHandler: Multer.none()}, async (request, reply) => {
        UserController.insertUser(request, reply);
    })
    fastify.get("/profile/", async (request, reply) => {
        if(Auth.checkAuth(request, reply).isMember().isLibrarian().isAccepted()){
            UserController.getProfile(request, reply);
        }
    })
    fastify.get('/user/:id', async (request, reply) => {
        if(Auth.checkAuth(request, reply).isAccepted()){
            UserController.getUser(request, reply);
        }
    })
    fastify.put('/:id', async (request, reply) => {
        const {authorization} = request.header;
        const userData = Auth.extractor(authorization);
        if(Auth.checkAuth(request, reply).isAccepted() || userData.sub === request.params.id){

        }
    })
    fastify.delete('/', async (request, reply) => {
        reply.send("UNDER_CONSTRUCTION");
    })
    
}