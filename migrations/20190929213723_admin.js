
exports.up = function(knex) {
    return knex.schema.createTable('admin', function(t) {
        t.increments('user_id').unsigned().primary();
        t.bigInteger('createdAt').notNull();
        t.bigInteger('updatedAt').nullable();
        t.bigInteger('deletedAt').nullable();
        
        t.string('username').notNull();
        t.string('first_name').notNull();
        t.string('last_name').notNull();
        t.bigInteger('birth_date').nullable();
        t.string('phoneNumber', 14).nullable();
        t.enum('user_type', ['super_admin', 'librarian']).notNull()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin');
};
