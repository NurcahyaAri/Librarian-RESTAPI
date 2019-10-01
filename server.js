"use strict"
const path = require('path');
const fastify = require('fastify')({
    logger : true,
});
require('dotenv').config({path : '.env'});

class Server {
    constructor(){
        global.__basedir = __dirname;
        this.register();
        this.start();
    }

    async register(){
        this.port = process.env.PORT;
        fastify.register(require('fastify-formbody'))
        fastify.register(require('fastify-static'), {
            root: path.join(__dirname, 'assets'),
            prefix: '/public/', // optional: default '/'
        })
        fastify.register(require('./config/routes')) // register routes
          
    }

    async start() {
        try{
            await fastify.listen(this.port);
            console.log(`Server listen in port ${this.port}`);
        } catch(e){
            console.log(e);
            process.exit(1);
        }
    }
}

new Server();