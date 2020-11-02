var express = require("express");
var app = express();
var path = require("path");
var HTTP_PORT = process.env.PORT || 8080;
app.use(express.static("./public"));

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
// setup route to listen on /
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/views/home.html"));
});
// setup route to listen on /home.html
app.get("/home.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/views/home.html"));
});

app.get("/roomListing.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/views/roomListing.html"));
});

app.get("/userRegistration.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/views/userRegistration.html"));
});

app.get("/dashboard.html", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/views/dashboard.html"));
});

app.get("/abc", function (req, res) {
 res.json({"name":"hey"});
});

app.post('/register', function(req, res) {
  // Your logic and then redirect
  res.redirect('/dashboard.html');
});

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
app.listen(HTTP_PORT, onHttpStart);
