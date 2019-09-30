
exports.up = function(knex) {
    return knex.schema.createTable('book_category', function(t) {
        t.increments('category_id').unsigned().primary();
        t.integer('category_fkid').unsigned().nullable();
        t.string('name', 100).notNull();
        t.unique('name');
        t.bigInteger('created_at').notNull();
        t.bigInteger('updated_at').nullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('book_category')
};
