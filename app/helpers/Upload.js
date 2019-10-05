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

const move = (req, filename, userid, type) => {
    console.log(process.cwd());
    if (!fs.existsSync(`${process.cwd()}/assets/${type}/${userid}`)){
        fs.mkdirSync(`${process.cwd()}/assets/${type}/${userid}`, {recursive:true});
    }
    const err = fs.renameSync(`${process.cwd()}/assets/${filename}`, `${process.cwd()}/assets/${type}/${userid}/${filename}`);
    if(err === undefined){
        const newDir = `public/${type}/${userid}/${filename}`;
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