var express = require('express');
var router = express.Router();

// router.get('/api', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET React App */
router.get(['/home', '/home/*'], function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'app.html'));
});

module.exports = router;
