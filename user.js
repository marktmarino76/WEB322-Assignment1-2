const mongoose = require('mongoose')

//Declares and defines formatting for a new "User" schema
let userSchema = new mongoose.Schema({
  "email" : {
       "type" : String,
      "unique": true
    },
  "firstname" :  String,
  "lastname" :  String,
  "password" : String,
  "birthday" : String,
  "admin" : { type: Boolean, default: false }
});

//Once we’ve created the userSchema, we can use mongoose’s model method to create the model.
module.exports = mongoose.model("User", userSchema);

 