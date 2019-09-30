
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('user_id').unsigned().primary();
        t.bigInteger('created_at').notNull();
        t.bigInteger('updated_at').nullable();
        t.bigInteger('deleted_at').nullable();
        
        t.string('username').notNull();
        t.string('first_name').nullable();
        t.string('last_name').nullable();
        t.string('organization').notNull();
        t.bigInteger('birth_date').notNull();
        t.string('phoneNumber', 14).nullable();
        t.string('password').nullable();
        t.text('bio').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
