const mongoose = require('mongoose')
const { resolve } = require('path');
const password = encodeURIComponent('sunnyday1')
mongoose.connect(`mongodb+srv://test:${password}@cluster0.rhg2x.mongodb.net/userinfo?retryWrites=true&w=majority`,{useNewUrlParser:true, useUnifiedTopology: true});
 //Check whether our connection has succeeded or failed
 const db = mongoose.connection
 db.once('open', () => {
     console.log('Database connected:' );
   });
 
 db.on('error', err => {
     console.error('connection error:', err);
   });

//Express.js
var express = require("express");
var app = express();
var path = require("path");
var HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

//Include handlebars
const exphbs = require("express-handlebars");
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs());

//Import routes (.js Authenticator file)
const authRoute = require("./auth");
const roomRoute = require("./createUpdateRoom");
//Middleware that allows us to use post requests
app.use(express.json());
//Route middlewares
app.use(authRoute);
app.use(roomRoute);

// This is a helper middleware function that checks if a user is logged in
// we can use it in any route that we want to protect against unauthenticated access.
// A more advanced version of this would include checks for authorization as well after
// checking if the user is authenticated
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/userRegistration");
  } else {
    next();
  }
}


//-------------------------------------------------------------- HOME PAGE ----------------------------------------------------------------------------//
// setup route to listen on /
app.get("/", function (req, res) {
  //Renders the home page and sends cookies to detect whether user is logged in or not
  res.render("home", {
    user: req.session.user,
    layout: false,
  });
});

const Room = require("./room");
app.post("/roomListingByLocation", async function (req, res) {
  //Renders the home page and sends cookies to detect whether user is logged in or not
 
  res.render("roomListing", {
    user: req.session.user,
    layout: false,
    roomCollection: await Room.find({location: req.body.loc}).lean()
  });
});

//-------------------------------------------------------------- USER REGISTRATION ----------------------------------------------------------------------------//
app.get("/register", function (req, res) {
  //Renders the user registration page
  res.render("userRegistration", {
    layout: false,
  });
});

//-------------------------------------------------------------- DASH BOARD ----------------------------------------------------------------------------//
app.get("/dashboard", ensureLogin, (req, res) => {
  //Renders user dashboard page and sends user cookies to detect whether user is logged in or not
  res.render("dashboard", { user: req.session.user, layout: false });
});
//-------------------------------------------------------------- ADMINISTRATOR DASH BOARD ----------------------------------------------------------------------------//
app.get("/administratorDashboard", ensureLogin, (req, res) => {
  //Renders administrator dashboard page and sends user cookies to detect whether user is logged in or not
  res.render("administratorDashboard", {
    user: req.session.user,
    layout: false,
  });
});

//Call back function, once the server starts then it will console Server Up and Running
app.listen(HTTP_PORT, () => console.log("Server Up and running"));



//app.listen(HTTP_PORT, onHttpStart);

// set up sequelize to point to our postgres database
// var sequelize = new Sequelize('d4hopb2hvkh7jg', 'absoyrworoovxk', '18afa8a0eb2d371b5144fb2497ff6b42b0e4f67392795269c2800ddf234b29e1', {
//   host: 'ec2-23-20-168-40.compute-1.amazonaws.com',
//   dialect: 'postgres',
//   port: 5432,
//   dialectOptions: {
//       ssl: { rejectUnauthorized: false }
//   }
// });
// sequelize
//   .authenticate()
//   .then(function() {
//       console.log('Connection has been established successfully.');
//   })
//   .catch(function(err) {
//       console.log('Unable to connect to the database:', err);
//   });

//   const Sequelize = require('sequelize');

// //   var BlogEntry = sequelize.define('BlogEntry', {
// //     title: Sequelize.STRING,  // entry title
// //     author: Sequelize.STRING, // author of the entry
// //     entry: Sequelize.TEXT, // main text for the entry
// //     views: Sequelize.INTEGER, // number of views
// //     postDate: Sequelize.DATE // Date the entry was posted
// // });

// let Courses = sequelize.define('Courses', {
//   courseCode: Sequelize.STRING,  // entry title
//   courseName: Sequelize.STRING, // author of the entry
//   preRequisite: Sequelize.STRING, // main text for the entry
//   registrationDate: Sequelize.DATE, // Date the entry was posted
//   year: Sequelize.INTEGER, // number of years
//   credits: Sequelize.DOUBLE
// });

// sequelize.sync().then(function () {
// Courses.create({
//   courseCode: "Web 322",  // entry title
//   courseName: "Web Programming Tools and Frameworks", // author of the entry
//   preRequisite: "Web 222", // main text for the entry
//   registrationDate: 01/09/2020, // Date the entry was posted
//   year: 3, // number of years
//   credits: 3.00
// }).then(function (project) {
//   // you can now access the newly created Project via the variable project
//   console.log("success!")
// }).catch(function (error) {
//   console.log("something went wrong!");
// });
// });

// sequelize.sync().then(function () {
//   // return all first names where year ==3
//   Courses.findAll({
//     attributes: ['courseCode','courseName'],
//     where: {
//         year:3
//     }
// }).then(function(data){
//     // pull the data (exclusively)
//     data = data.map(value => value.dataValues);

//     console.log("All first names where id == 2");
//     for(var i =0; i < data.length; i++){
//         console.log(data[i].courseCode);
//         console.log(data[i].courseName);
//     }
// });
// });

// var User = sequelize.define('User', {
//   fullName: Sequelize.STRING, // the user's full name (ie: "Jason Bourne")
//   title: Sequelize.STRING // the user's title within the project (ie, developer)
// });

// var Task = sequelize.define('Task', {
//   title: Sequelize.STRING, // title of the task
//   description: Sequelize.TEXT // main text for the task
// });

// // Associate Tasks with user & automatically create a foreign key
// // relationship on "Task" via an automatically generated "UserId" field

// User.hasMany(Task);

// app.post('/dashboard.html', function(req, res) {
//   res.send('You sent the name "' + req.body.firstname + '".');
// });

// // setup a 'route' to listen on the default url path (http://localhost)
// app.get("/", function(req,res){
//     res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
// });

// // setup another route to listen on /about
// app.get("/about", function(req,res){
//     res.send("<h3>About</h3>");
// });

// setup http server to listen on HTTP_PORT
