"use strict"
const path = require('path');
const cluster = require('cluster')
const os = require('os')
const fastify = require('fastify')({
    logger : true,
});
require('dotenv').config({path : '.env'});

class Server {
    constructor(){
        global.__basedir = __dirname;
        if (cluster.isMaster) {
            const cpuCount = os.cpus().length;
            for (let i = 0; i < cpuCount; i++) {
                cluster.fork();
            }
        } else {
            this.register();
            this.start();
        }
        cluster.on('exit', (worker) => {
            console.log('mayday! mayday! worker', worker.id, ' is no more!')
            cluster.fork()
        })
    }

    async register(){
        this.port = process.env.PORT;
        fastify.register(require('fastify-cors'), { 
            // put your options here
        })          
        fastify.register(require('fastify-formbody'));
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