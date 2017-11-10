const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
//const path = require('path');

router.get('/', isLoggedIn, (req,res) => {
  let path = req.baseUrl;
  res.render('secure/main', {
    path: path
     });
    console.log(path)
});




module.exports = router;
