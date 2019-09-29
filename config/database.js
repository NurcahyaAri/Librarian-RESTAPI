const Knex = require('knex');
const Database = Knex({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
    },
    pool: { min: 0, max: 3 },
});

let {Model} = require('objection')
Model.knex(Database);

module.exports = {
    Database,
    Model
};