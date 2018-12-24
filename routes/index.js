var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Hello World page
router.get('/helloworld', (req, res) => {
  res.render('helloworld', { title: 'Hello, World!' })
})

// GET Userlist page
router.get('/userlist', function(req, res) {
  const db = req.db
  const collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs){
    res.render('userlist', {
      "userlist": docs
    });
  });
});

// GET New User page
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' })
});

// POST to Add user service
router.post('/adduser', function(req, res,) {

  // Set our internal dB variable
  const db = req.db

  // Get our form values. These rely on the "name" attributes
  const userName = req.body.username
  const userEmail = req.body.useremail

  // Set our collection
  const collection = db.get('usercollection')

  // Submit to the dB
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function (err, doc) {
    if(err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database")
    }
    else {
      // And forward to success page
      res.redirect("userlist")
    }
  })

})


module.exports = router;
