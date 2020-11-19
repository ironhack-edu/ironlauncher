const router = require('express').Router();

// ? Package to will handle encryption of password
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Requiring the User model in order to interact with the database
const User = require('../models/User.model');

// Requiring necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require('../middlewares/shouldNotBeLoggedIn');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/signup', shouldNotBeLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', shouldNotBeLoggedIn, (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).render('signup', { errorMessage: 'Please provide your username' });
  }

  if (password.length < 8) {
    return res.status(400).render('signup', {
      errorMessage: 'Your password needs to be at least 8 characters'
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then(found => {
    if (found) {
      return res.status(400).render('signup', { errorMessage: 'Username already taken' });
    }
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username,
          password: hashedPassword
        });
      })
      .then(user => {
        // binds the user to the session object
        req.session.user = user;
        res.redirect('/');
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).render('signup', { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render('signup', {
            errorMessage: 'Username need to be unique. THe username you chose is already in used.'
          });
        }
        return res.status(500).render('signup', { errorMessage: error.message });
      });
  });
});

router.get('/login', shouldNotBeLoggedIn, (req, res) => {
  res.render('auth/login');
});

router.post('/login', shouldNotBeLoggedIn, (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).render('login', { errorMessage: 'Please provide your username' });
  }

  //   * Here we use the same logic as above - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render('login', {
      errorMessage: 'Your password needs to be at least 8 characters'
    });
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).render('login', { errorMessage: 'Wrong credentials' });
      }

      return bcrypt.compare(password, user.password);
    })
    .then(isSamePassword => {
      if (!isSamePassword) {
        return res.status(400).render('login', { errorMessage: 'Wrong credentials' });
      }
      req.session.user = user;
      // req.session.user = user._id ! better and safer but in this case we saving the entire user object
      return res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).render('auth/logout', { errorMessage: err.message });
    }
    res.redirect('/');
  });
});

module.exports = router;
