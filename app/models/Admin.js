const { Model } = require('../../config/database');

class Admin extends Model{
    static get idColumn(){
        return 'admin_id';
    }
    
    static get tableName(){
        return 'admin';
    }
}

module.exports = Admin;