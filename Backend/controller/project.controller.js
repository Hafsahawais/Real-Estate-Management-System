var Grid  = require('gridfs-stream');
const mongoose = require("mongoose");

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
            if (err)
                res
                    .status(400)
                    .json({message: "Something Went Wrong", data: err});
            else
                res
                    .status(200)
                    .json({
                        message: "Project updated Successfully",
                        id: resp
                    });


        })
    }




};
