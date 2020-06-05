var Grid  = require('gridfs-stream');
const mongoose = require("mongoose");
var fs = require('fs');
var http = require('http');
var Project = require('../models/project');
const helpers = require('../provider/helper');
var property = require('../models/property');

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
            // Creating slug for the listing
            var slug  = await helpers.slugGenerator(req.body.title, 'title', 'project');

            req.body.slug = slug;
            req.body.name = req.body.projectname;
            req.body.description = req.body.descr;
            req.body.location = req.body.address;
            req.body.priceFrom = req.body.pricefrom;
            req.body.priceTo= req.body.priceto;
            req.body.builder = req.body.builders;
            req.body.email = req.body.emails;
            req.body.phoneNo  = req.body.pno;
            req.body.propertyTypes = req.body.proptype;
            req.body.properties = property._id;
            req.body.images = imgs;
            req.body.imgPath = 'properties';

            const p = new Project(req.body);
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
            var result  = await Project.findOne({ slug: req.params.projectSlug })
                .populate('location', 'name')
                .populate('description');

            var files = [];
            if(result && result.images.length){
                files = await gfs.files.find({ filename: { $in : result.images } }).toArray();
            }
            if(result) res.status(200).json({result, files});
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
