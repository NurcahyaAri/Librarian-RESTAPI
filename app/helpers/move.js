const fs = require('fs');

const move = (filename, userid) => {
    const success = fs.renameSync(`${__dirname}../../assets/${filename}`, `${__dirname}../../assets/${userid}${filename}`);
    if(success){
        return true;
    }
    return false;
}

module.exports = move;