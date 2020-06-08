var Grid  = require('gridfs-stream');
const mongoose = require("mongoose");
var fs = require('fs');
var http = require('http');
var Project = require('../models/project');
const helpers = require('../provider/helper');

var gfs;
var conn = mongoose.connection;
conn.on('connected', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('imageMeta');
});

module.exports = {
    projectList: (req, res) => {
        Project.find({ isActive: true })
            .populate('createdBy')
            .exec((err, result) => {
                if (err)
                    res.status(400).send(err);
                else
                    res.status(200).json(result);
            });
    },
    addNewProject: async (req, res) => {
        let imgs = [];
        let properties = []
        try {
            if (req.files && req.files.length)
                req.files.forEach(ele => imgs.push(ele.filename));
            // Creating slug for the listing
            var slug  = await helpers.slugGenerator(req.body.name, 'name', 'project');

            req.body.slug = slug;
            req.body.images = imgs;
            req.body.imgPath = 'projects';
            req.body.properties = properties

            const project = new Project(req.body);
            const result = await project.save();

            if (result && result._id && result.slug)
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
            Project.priceFrom = req.body.priceFrom;
            Project.priceTo= req.body.priceTo;
            Project.builder = req.body.builder;
            Project.email = req.body.email;
            Project.phoneNo  = req.body.phoneNo;
            Project.propertyTypes = req.body.propertyTypes;
            Project.imgPath = 'projects';

            Project.save((err, data) => {
                if (err) res.status(400).send(err);
                else
                    res
                        .status(200)
                        .json({message: "Project Added Successfully", id: data._id});
            });


        })
        // new Promise((resolve, reject) => {
        //     return Project.findOne({ _id: req.body._id })
        // })
        //     .then(resp => {
        //         res.status(200).json({resp});
        //     })
        //     .catch()
    },
    getSingleProject: async (req, res) => {
        try{
            var result  = await Project.findOne({ _id: req.params.projectId })
                .populate('createdBy');
            if(result) res.status(200).json({result});
            else throw new Error('Something Went Wrong');
        }
        catch(err){
            res.status(400).json({message: err.message});
        }

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
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            }
        })
    }



};
