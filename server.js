const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://localhost:27017/projectdb',
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log('Connected to mongoDB');
    },
    (err) => console.log('Error connecting to mongoDB', err)
  );

const app = express();
const hostname = 'localhost';
const port = 3000;
const server = http.createServer(app);
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

