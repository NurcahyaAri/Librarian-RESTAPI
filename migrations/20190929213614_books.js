
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(t) {
        t.increments('book_id').unsigned().primary();
        t.bigInteger('createdAt').notNull();
        t.bigInteger('updatedAt').nullable();
        t.bigInteger('deletedAt').nullable();
        
        t.string('sku').notNull();
        t.string('name').notNull();
        t.integer('price_buy').nullable();
        t.integer('stock').nullable();
        t.integer('category_id').notNull();
        t.integer('shelf_id').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
