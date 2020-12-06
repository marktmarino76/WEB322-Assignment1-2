const mongoose = require('mongoose')


//Declares and defines formatting for a new "User" schema
let roomSchema = new mongoose.Schema({
  "title" : String,
  "price" :  Number,
  "description" :  String,
  "location" : String,
  "photo" : String
});

//Once we’ve created roomSchema, we can use mongoose’s model method to create the model.
module.exports = mongoose.model("Room", roomSchema);

 