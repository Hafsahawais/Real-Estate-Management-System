const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Project = require('../models/project');
const User = require('../models/user');
const projectRouter = express.Router();

projectRouter.use(bodyParser.json());

projectRouter.route('/')
  .post((req, res, next) => {
    // var userId = req.body.user;
    Project.create(req.body)
      .then((project) => {
        project.name = req.body.name;
        project.total_number = project.total_number + 1;

        // User.findOne({_id: userId});

        console.log('Project Created ', project);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
      }, (err) => next(err))
      .catch((err) => next(err));
  })

.delete((req, res, next) => {
  Project.findByIdAndRemove(req.params.projectId)
    .then((resp) => {
      res.statusCode = 200;
      res.send('Project ' + req.body.name + ' removed ');
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = projectRouter;

