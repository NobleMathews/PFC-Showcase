var express = require('express');
var router = express.Router();
const path = require('path');

// router.get('/api', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET React App */
router.get(['/', '/*'], function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
