const { Model } = require('../../config/database');
const Borrowed = require('./Book_borrowed');
class Users extends Model{
    static get tableName(){
        return 'users';
    }

    static get relationMappings(){
        return {
            Borrowed : {
                relation : Model.HasManyRelation,
                medelClass : Borrowed,
                join : {
                    from : 'user.user_id',
                    to : 'borrowed.user_fkid'
                }
            }
        }
    }
}

module.exports = Users;