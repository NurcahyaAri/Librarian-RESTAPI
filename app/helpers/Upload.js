const multer = require('fastify-multer');
const path = require('path');
const fs = require('fs');
const dir = multer.diskStorage({
    destination : `${__dirname}./../../assets/`,
    filename : (req, file, cb) => {
        cb(null,  file.originalname);
    }
})
const upload = multer({
    storage : dir,
    fileFilter : function (req, file, cb) {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true); 
    }
});

const move = (req, filename, userid) => {
    
    if (!fs.existsSync(`${__basedir}/assets/${userid}`)){
        fs.mkdirSync(`${__basedir}/assets/${userid}`);
    }
    const err = fs.renameSync(`${__basedir}/assets/${filename}`, `${__basedir}/assets/${userid}/${filename}`);
    if(err === undefined){
        const newDir = `public/${userid}/${filename}`;
        const url = `${req.headers.host}/${newDir}`;
        console.log(url);
        return url;
    } else {
        throw "ERROR_WHILE_MV";
    }
}


module.exports = {
    move : move,
    upload : upload
};