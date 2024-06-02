const multer  = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "store");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

exports.multer = multer({storage:storageConfig, fileFilter: fileFilter}).single("image");