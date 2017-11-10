const express    = require('express');
const User       = require('../models/User');
const router     = express.Router();
const path       = require('path');
const bcrypt     = require('bcrypt');
const bcryptSalt = 10;

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username }, (err, user) => {
      if (err || !user) {
        res.render("auth/signup", {
          errorMessage: "The username doesn't exist"
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        return res.redirect("/main");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
  });

});

router.post('/signup', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({
      "username": username
    },
    "username",
    (err, user) => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username already exists"
        });
        return;
      }

      var salt = bcrypt.genSaltSync(bcryptSalt);
      var hashPass = bcrypt.hashSync(password, salt);

      var newUser = User({
        username,
        password: hashPass
      });

      newUser.save((err) => {
        return res.redirect("/login");
      });
    });
})



module.exports = router;
