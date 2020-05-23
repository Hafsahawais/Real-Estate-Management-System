const express = require('express');
const mongoose = require('mongoose');
const app = express();
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const http = require('http');

mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://localhost:27017/realestate',
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log('Connected to mongoDB');
    },
    (err) => console.log('Error connecting to mongoDB', err)
  );

const hostname = 'localhost';
const port = 3000;
const server = http.createServer(app);

const userRouter = require('./routes/userRouter');
const  propertyRouter = require('./routes/propertyRouter');
const  bookingRouter = require('./routes/bookingRouter');
// const  profileRouter = require('./routes/profileRouter');
const  projectRouter = require('./routes/projectRouter');
app.use('/properties', propertyRouter);
app.use('/users',userRouter);
app.use('/booking', bookingRouter);
// app.use('/profile', profileRouter);
app.use('/project', projectRouter);

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

