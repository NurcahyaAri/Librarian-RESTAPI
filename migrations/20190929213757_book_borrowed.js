
exports.up = function(knex) {
    return knex.schema.createTable('book_borrowed', function(t) {
        t.increments('load_id').unsigned().primary();
        t.bigInteger('createdAt').notNull();
        t.bigInteger('updatedAt').nullable();

        t.integer('user_id').unsigned().references('users.user_id').notNull();
        t.integer('book_id').unsigned().references('books.book_id').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('book_borrowed');
};
