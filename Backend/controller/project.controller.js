var Grid  = require('gridfs-stream');
const mongoose = require("mongoose");
var fs = require('fs');
var http = require('http');
var Project = require('../models/project');


var gfs;
var conn = mongoose.connection;
conn.on('connected', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('imageMeta');
});

module.exports = {
    projectList: (req, res) => {
        Project.find({is_active: true}, (err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
        });
    },
    addNewProject: async (req, res) => {
        let imgs = [];
        try {
            var project = new Project();
            if (req.files && req.files.length)
                req.files.forEach(ele => imgs.push(ele.filename));
            //Creating slug for the listing
            // var slug  = await helpers.slugGenerator(req.body.title, 'title', 'property');

            project.name = req.body.name;
            project.description = req.body.description;
            project.location = req.body.location;
            project.images = imgs;
            project.imgPath = 'projects';

            const prop = new Project(req.body);
            const result = await project.save();

            if (result && result._id)
                res.status(200).json({result, message: "Your project has been successfully posted"});
            else throw new Error('Something Went Wrong');
        } catch (err) {
            console.log({err});
            res.status(400).json({message: err.message});
        }
    },
    updateProject: (req, res) => {

        Project.findOneAndUpdate({_id: req.body._id}).exec((err, resp) => {
            let imgs = [];
            if (req.files && req.files.length)
                req.files.forEach(ele => imgs.push(ele.filename));

            Project.name = req.body.name;
            Project.description = req.body.description;
            Project.location = req.body.location;
            Project.images = imgs;
            Project.imgPath = 'projects';

            Project.save((err, data) => {
                if (err) res.status(400).send(err);
                else
                    res
                        .status(200)
                        .json({message: "Project Added Successfully", id: data._id});
            });


        })
    },
    showGFSImage: (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // Check if image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // Read output to browser
                const readstream = createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            }
        })
    }



};
