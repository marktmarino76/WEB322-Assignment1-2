const router = require("express").Router();
const bodyParser = require("body-parser");

//User module to include the modal
const User = require("./user");
//Bcrypt Module to hash passwords
const bcrypt = require("bcryptjs");

//clientsessions
const clientSessions = require("client-sessions");

// //Authentication Packages
// const session = require('express-session');
// const passport = require('passport');
// router.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }));
// router.use(passport.initialize());
// router.use(passport.session());
// Setup client-sessions
router.use(
  clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example_web322", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60, // the session will be extended by this many ms each request (1 minute)
  })
);

// Parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

//------------------------------------------------------------- REGISTRATION --------------------------------------------------------//
router.post("/register", async function (req, res) {
  try {
    //Checking if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let userData = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
      birthday: req.body.birthday,
      admin: false,
    });

    const savedUser = await userData.save();
    // res.send({userData:userData._id});
    // res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send(err);
  }
});
//------------------------------------------------------------- LOGIN -------------------------------------------------------------//
router.post("/login", async function (req, res) {
  try{

  
  //Checking if the username (email) exists in the database
  const user = await User.findOne({ email: req.body.loginemail });

  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.loginpassword, user.password);
  //IF PASSWORD IS NOT CORRECT RENDER THE PAGE AGAIN WITH THE ERROR

  //If the username and password recieved are the same as the one found in the database, create session
  if (user.email === req.body.loginemail && validPass) {
    // Add the user on the session and redirect them to the dashboard page.
    req.session.user = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      birthday: user.birthday,
      admin: user.admin,
    };
    if (user.admin) {
      res.redirect("/administratorDashboard");
    } else {
      res.redirect("/dashboard");
    }
  } else {
    // render 'invalid username or password'
    return res.render("userRegistration", { error: true, layout: false });
  }
}catch{
    // render 'invalid username or password'
    return res.render("userRegistration", { error: true, layout: false });
}
});

// Log a user out by destroying their session
// and redirecting them to /login
router.get("/logout", function (req, res) {
  req.session.reset();
  res.redirect("/register");
});

module.exports = router;
