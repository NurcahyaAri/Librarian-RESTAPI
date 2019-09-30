
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(t) {
        t.increments('book_id').unsigned().primary();
        t.bigInteger('created_at').notNull();
        t.bigInteger('updated_at').nullable();
        t.bigInteger('deleted_at').nullable();
        
        t.string('sku').notNull();
        t.string('name').notNull();
        t.string('author').notNull();
        t.string('publisher').notNull();
        t.string('published', 5).notNull();
        t.integer('price_buy').nullable();
        t.integer('stock').nullable();
        t.integer('category_fkid').unsigned().references('book_category.category_id').nullable();
        t.string('shelf_location').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
