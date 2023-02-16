const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const imageUpload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
}).array('images', 4);

const multerConfig = {
    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({
      //specify destination
      destination: function(req, file, next){
        next(null, './public/zip-storage');
      },

      //specify the filename to be unique
      filename: function(req, file, next){
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        //set the file fieldname to a unique name containing the original name, current datetime and the extension.
        next(null, file.fieldname + '-' + Date.now() + '.'+ext);
      }
    }),

    // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }
        // only permit zip mimetypes
        const zip = file.mimetype.startsWith('application');
        if(zip){
          console.log('zip uploaded');
          next(null, true);
        }else{
          console.log("file not supported")
          errorReq = true;
          return next();
        }
    }
  };


  multer(multerConfig).array('images', 4);

module.exports = imageUpload