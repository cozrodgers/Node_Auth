var express = require('express');
var router = express.Router();


var multer = require('multer');
var upload = multer({
  dest: './uploads'
});

var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'Register'
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

router.post('/register', upload.single('avatar'), function (req, res, next) {


  const Name = req.body.Name
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Password2 = req.body.Password2;

  if (req.file) {
    console.log('Uploading file..')
    var ProfileImage = req.file.filename;
  } else {
    console.log('Upload failed');
    var ProfileImage = 'noimage.jpg';
  }


  // Form Validator
  req.checkBody('Name', 'Name field is required').notEmpty();
  req.checkBody('Email', 'Email field is required').notEmpty();
  req.checkBody('Email', 'Email is not valid').isEmail();
  req.checkBody('Username', 'Username field is required').notEmpty();
  req.checkBody('Password', 'Password field is required').notEmpty();
  req.checkBody('Password2', 'Passwords do not match').equals(req.body.Password);

  //check for validation errors
  var errors = req.validationErrors();


  if(errors) {
    console.log('errors found please check code');
    //if theres errors, render the register screen again with an error notification
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      //pass variables into the schema here
        //schema fields SHOULD Match Field names of forms
      Name: Name,
      Email: Email,
      Username: Username,
      Password: Password,
      avatar: ProfileImage

    });

    User.createUser(newUser, function (err, user) {
      if (err){
        throw err
    
      }
      else{
      console.log(user);
    }
      //flashes message provide the CLASS and the MESSAGE in the params
      
    });
    //show success message on page
    req.flash('success', 'You have Registered and can now Log in');

    res.location('/');
    res.redirect('/')
  }
});


module.exports = router;