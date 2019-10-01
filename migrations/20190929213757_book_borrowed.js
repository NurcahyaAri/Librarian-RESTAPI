
exports.up = function(knex) {
    return knex.schema.createTable('book_borrowed', function(t) {
        t.increments('load_id').unsigned().primary();
        t.bigInteger('created_at').notNull();
        t.bigInteger('updated_at').nullable();

        t.integer('user_fkid').unsigned().references('users.user_id').notNull();
        t.integer('book_fkid').unsigned().references('books.book_id').notNull();

        t.bigInteger('time_load').unsigned().notNull();
        t.bigInteger('time_return').unsigned().nullable();
        t.bigInteger('time_returned').unsigned().nullable();

        t.integer('fine').unsigned().nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('book_borrowed');
};
