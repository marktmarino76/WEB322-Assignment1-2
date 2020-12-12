// setup our requires
const route = require("express").Router();
const bodyParser = require("body-parser");
route.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
const Room = require("./room");
// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
  //Destination as in place to store image on server(my computer)
  destination: "./public/images/",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });

// now add a route that we can POST the form data to
// IE: http://localhost/register-user
// add the middleware function (upload.single("photo")) for multer to process the file upload in the form
// the string you pass the single() function is the value of the
// 'name' attribute on the form for the file input element
route.post("/createRoom", upload.single("photo"), (req, res) => {
  let roomData = new Room({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    location: req.body.location,
    photo: req.file.filename,
  });

  roomData.save();
  res.redirect("/roomListing");
});

route.post("/updateRoom", upload.single("photo"), async (req, res) => {

  //Finds the room in the database using _id recieved from post
  const filter = {_id: req.body.roomID};
   const updatedRoom = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    location: req.body.location,
    photo: req.file.filename
  };
  const updateDoc = await Room.findOneAndUpdate(filter,updatedRoom,{
    new:true
  });
  res.redirect("/roomListing");
});

//-------------------------------------------------------------- ADMINISTRATOR CREATE ROOM PAGE ----------------------------------------------------------------------------//
route.get("/createRoom", async function (req, res) {
  res.render("createRoom", {
    user: req.session.user,
    layout: false,
    rooms: await Room.find({}).lean(),
  });
});

//-------------------------------------------------------------- ROOM LISTING ----------------------------------------------------------------------------
route.get("/roomListing", async function (req, res) {
  res.render("roomListing", {
    user: req.session.user,
    layout: false,
    roomCollection: await Room.find({}).lean()
  });
});

//-------------------------------------------------------------- ROOM DETAILS ----------------------------------------------------------------------------
route.get("/roomDetail/:roomId", async function (req, res) {
  //res.json({message: req.params.userId});
  res.render("roomDetail",{
    user: req.session.user,
    layout: false,
    roomDetail: await Room.find({_id: req.params.roomId}).lean()
  });
 
});


module.exports = route;
