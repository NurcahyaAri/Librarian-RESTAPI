
exports.up = function(knex) {
    return knex.schema.createTable('admin', function(t) {
        t.increments('admin_id').unsigned().primary();
        t.bigInteger('created_at').notNull();
        t.bigInteger('updated_at').nullable();
        t.bigInteger('deleted_at').nullable();
        
        t.string('username').notNull();
        t.string('password').notNull();
        t.enum('user_type', ['super_admin', 'librarian']).notNull()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin');
};
