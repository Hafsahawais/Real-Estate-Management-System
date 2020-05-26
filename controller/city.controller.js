const mongoose = require('mongoose');
var city_model = require('../server/models/city');
var users = require('../server/models/user');



module.exports = {

  //CITIES
  getAllCities: (req, res) => {
    city_model.find({ is_active: true })
      .populate('state_id', 'name')
      .exec((err, data) => {
        if(err)
          res.status(400).send(err);
        res.status(200).json(data);
      });
  },
  getCityList: (req, res) => {
    city_model.find({is_active: true })
      .populate('state_id', 'name')
      .exec((err, data) => {
        if(err)
          res.status(400).send(err);
        res.status(200).json(data);
      });
  },
  addCity: async (req, res) => {
    try{
      var city = new city_model(req.body);
      const result = await city.save();
      console.log({result});
      if(result) res.status(200).json({ message: 'City added successfully' });
      else throw new Error('Something Went Wrong');
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  },
  removeCity: (req, res) => {
    city_model.remove({_id: req.params.cityId }, (err, result) => {
      if(err)
        res.status(400).send(err);
      res.status(200).json({ message: 'City removed successfully', data: result });
    })
  },
  //checkemailAvailability
  checkemailAvailability: (req, res) => {
    // res.send(req.params.email);
    var email = req.params.email;

    users.find({email: email}, (err, result) => {
      if(err)
        res.status(400).send(err);
      else if(result.length > 0)
        res.status(200).json({  response: true});
      else
        res.status(200).json({  response: false});
    });

  }

}
