
exports.up = function(knex) {
    return knex.schema.createTable('user_activity',function(t){
        t.increments('log_id').unsigned().primary();
        t.bigInteger('created_at').notNull();
        t.bigInteger('updated_at').nullable();


    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_activity');
};
