const { Model } = require('../../config/database');

class BookCategory extends Model{
    static get idColumn(){
        return 'category_id';
    }
    static get tableName(){
        return 'book_category';
    }
}

module.exports = BookCategory;