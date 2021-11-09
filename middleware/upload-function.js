const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// image upload function
module.exports = (dest) => {
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest);
        },
        filename: function(req, file, cb) {
            cb(null, uuidv4())
        }
    })
    
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    
    // multer - image upload
    const upload = multer({storage: fileStorage, fileFilter: fileFilter});
    
    return upload;
};