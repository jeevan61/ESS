const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },
    filename : function(req,file,cb){
        const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
});

const fileFilter = (req,file,cb) =>{
    const allowedTypes = ['application/zip','application/x-zip-compressed'];

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(new Error('only zip files are allowed'),false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;