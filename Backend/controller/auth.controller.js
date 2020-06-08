const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var user = require("../models/user");
var Grid  = require('gridfs-stream');
// var tokenProvider = require('../providers/token.provider');
const jwt = require("jsonwebtoken");
const createReadStream = require("gridfs-stream");

var secretKey = require("../config").secretKey;

var gfs;
var conn = mongoose.connection;
conn.on('connected', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('imageMeta');
});


  async function userLogin (req, res) {
    if (req.body.email !== "" && req.body.password !== "") {
      await user
          .findOne({$or: [
              {email: req.body.email},
              {phoneNo: req.body.email}
            ]})
          .exec((err, data) => {
            if (err) res.status(400).send(err);
            else if (data) {
              // res.send(data.);
              bcrypt.compare(req.body.password, data.password, function (
                  err,
                  passMatch
              ) {
                if (err) res.status(400).send(err);
                else if (passMatch) {
                  let jwtData = {
                    _id: data["_id"],
                    fname: data["fname"],
                    lname: data["lname"],
                    email: data["email"],
                    isAdmin: data["isAdmin"]
                  };
                  var token = jwt.sign({user: jwtData}, secretKey);
                  res
                      .status(200)
                      .json({message: "Login Successful", token: token, user: data});
                } else res.status(401).json({message: "Invalid Credentials1"});
              });
            } else res.status(401).json({message: "Invalid Credentials2"});
          });
    } else res.status(400).json({ message: "Provide all Credentials" });
  }
  async function userRegistration (req, res) {
    // res.send(req.body);
    // res.status(400).send('err')
    // let imgs = [];
    // console.log(req);
    try {
      if(req.body.agree) {
        users = await new user();
        // if (req.files && req.files.length)
        //   req.files.forEach(ele => imgs.push(ele.filename));

        users.fname = req.body.fname;
        users.lname = req.body.lname;
        users.email = req.body.email;
        users.phoneNo = req.body.phoneNo;
        // users.state = req.body.state;
        // users.city = req.body.city;
        // users.body.images = imgs;
        // users.body.imgPath = 'register';
        // users.pincode = req.body.pincode;
        // users.userType = req.body.userType;
        users.createdOn = new Date();

        await bcrypt.hash(req.body.password, 8,async function (err, hash) {
          if (err) {
            // console.log('Bycrpt')
            res.status(400).send(err);
          }
          else {
            users.password = hash;
               console.log(users)
              await users.save((err, data) => {
              if (err){
                // console.log('User Save')
                res.status(400).send(err);
              }
              else {
                // console.log('user added')
                res.status(200).json({message: "User Added Successfully", id: data._id});
              }
            });
          }
        });
      } else {
        // console.log('Privacy Policy')
        res.status(400).send({'message': 'Please agree with the privacy policy'})
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({'message': 'Unprocess entity'});
    }

  }
  async function userList (req, res) {
    user.find().exec((err, data) => {
      if (err)
        res.status(400).json({ message: "Something Went Wrong", data: err });
      else res.status(200).json({ message: "Success", data });
    });
  }

  async function changePass (req, res) {
    user.findOne({ _id: req.body._id }).exec((err, resp) => {
      if (err)
        res.status(400).json({ message: "Something Went Wrong", data: err });
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(400).send(err);
          else {
            user
              .updateOne({ _id: req.body._id }, { password: hash })
              .exec((err, resp) => {
                if (err)
                  res
                    .status(400)
                    .json({ message: "Something Went Wrong", data: err });
                else
                  res
                    .status(200)
                    .json({
                      message: "Password Changed Successfully",
                      id: resp
                    });
              });
          }
        });
      }
    });
  }
  async function showGFSImage (req, res) {
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

  async function getUserDetails (req, res) {
    user.findOne({ _id: req.params.userId })
        .exec((err, result) => {
          if(err)
            res.status(400).send(err);
          else{
            res.status(200).send(result);
          }
        });
  }

  async function updateProfile (req, res) {
    user.findOneAndUpdate({ _id: req.params.userId }, {...req.body}, {new: true, upsert: true})
        .exec((err, result) => {
          if(err)
            res.status(400).send(err);
          else{
            res.status(200).send(result);
          }
        });
  }

module.exports = {
  userLogin,
  userRegistration,
  userList,
  changePass,
  showGFSImage,
  getUserDetails,
  updateProfile
};
