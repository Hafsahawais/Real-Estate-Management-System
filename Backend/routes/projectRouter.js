const express = require('express');
var multer  = require('multer');
const crypto = require('crypto');
var path = require('path');
var GridFsStorage  = require('multer-gridfs-storage');
var config = require('../config');
var fs = require('fs');
var router = express.Router();
var projectController = require('../controller/project.controller');

// Create storage engine
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



// ====================================================================================
// ====================================ROUTES=========================================
// ====================================================================================
router.get('/projectList/', projectController.projectList);

//Property
router.post('/newProject', upload.array("projImages"), projectController.addNewProject);

router.put('/updateProject', projectController.updateProject);
router.get('/single/:projectId', projectController.getSingleProject);
router.get('/showGFSImage/:filename', projectController.showGFSImage); // To view image in front-end

//Properties filter
// router.get('/filter', propertyController.filterProperties);

module.exports = router;
