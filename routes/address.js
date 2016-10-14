var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        res.send({remPeridod: 'remaining..', curSingleBalance: 'waitting..' });
});

module.exports = router;
