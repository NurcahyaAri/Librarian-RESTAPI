const { Model } = require('../../config/database');
const Category = require('./Book_category');
class Books extends Model{
    static get idColumn(){
        return 'book_id';
    }
    static get tableName(){
        return 'books';
    }

    static get relationMappings(){
        return {
            category : {
                relation : Model.HasManyRelation,
                medelClass : Category,
                join : {
                    from : 'books.category_fkid',
                    to : 'book_category.category_id'
                }
            }
        }
    }
}

module.exports = Books;