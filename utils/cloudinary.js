// const multer = require("multer")
const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");


// Configuration 
cloudinary.config({
  cloud_name: "df3lsxk9y",
  api_key: "213848831198536",
  api_secret: "yosxBbytYHjI-snqew6Pp5OBJPI"
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads",
//     format: async (req, file) => "png || jpg || jpeg || gif || svg", // Set the format of the uploaded image to PNG
//     public_id: (req, file) => file.originalname // Use the original filename as public ID
//   }
// });
// const upload = multer({ storage: storage }).array("images", 4);

module.exports = cloudinary;
// module.exports = upload