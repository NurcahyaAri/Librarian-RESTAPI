const { Model } = require('../../config/database');
const Post = require('./Posts');
class Users extends Model{
    static get tableName(){
        return 'users';
    }

    static get relationMappings(){
        return {
            Post : {
                relation : Model.HasManyRelation,
                medelClass : Post,
                join : {
                    from : 'user.user_id',
                    to : 'user.user_fkid'
                }
            }
        }
    }
}