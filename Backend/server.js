const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
var app = express();


app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
// Routing
var users = require('./routes/userRouter');
var booking = require('./routes/bookingRouter');
var property = require('./routes/propertyRouter');
var complainRouter = require("./routes/complainRouter");
var chargeRouter = require("./routes/chargeRouter");
var paymentRouter = require("./routes/paymentRouter");
var facilityRouter = require("./routes/facilityRouter");

// Connect with DB
mongoose.connect('mongodb://localhost/realEstatedb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => // we're connected!
  {
    console.log('connected to dB');
  })
  .catch(err => console.error('Connection Error', err));


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));
//CORS
var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'); //,DELETE,OPTIONS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/auth', users);
app.use('/booking', booking);
app.use('/property', property);
app.use("/complains", complainRouter);
app.use("/payment", paymentRouter);
app.use("/charge", chargeRouter);
app.use("/facility", facilityRouter);


//console.log(process.env.PORT); //.PORT, ' -port');
// var tokenn = require('./config/config').secretKey;
// console.log('token ', tokenn);

var port =  process.env.PORT || 3000;
var hostname = 'localhost';

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

