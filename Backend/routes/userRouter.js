const express = require('express');

var app = express();
var router = express.Router();

var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var authC  = require('../controller/auth.controller');

const storage = new GridFsStorage({
  url: config.dbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'imageMeta'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.post('/user/login', authC.userLogin);
//registration
router.post('/user/register',upload.array("profileImages"), authC.userRegistration);

//admin
router.get('/admin/userList', authC.userList);
router.put('/admin/changePass', authC.changePass);

router.get('/showGFSImage/:filename', authC.showGFSImage); // To view image in front-end


// console.log(app);

module.exports = router;

