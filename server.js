const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  dbconnect = require('./config/DB');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
//import route:
const route = require('./API/routes/index.route');

// connect to DB:
dbconnect.connectDB(
  mongoose,
  process.env.HOSTNAME,
  process.env.DB_PORT,
  process.env.DB_NAME
);
// apply body-parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SECRET));

route(app);

app.listen(PORT, process.env.HOSTNAME, () => {
  console.log(`Server is up on ${PORT} port...`);
});
