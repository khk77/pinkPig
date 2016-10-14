var express = require('express');
var getSingldData = require('./getSingleData.js');
var router = express.Router();


/* GET home page. */
router.get('/:address', function(req, res, next) {
  var addressOfPeople = req.params.address;
  // console.log(addressOfPeople);
  var addrOfMe = '0xe648fce5ad5989d38236057af4912965c490bb93';
  var filename = './coinBox.sol';
  var contractName = 'PigBox';
  var contractAddress = '0x655501aa639bc446d26dd434b75ade855d2d23bc';
  var conObj = getSingldData(addrOfMe, filename, contractName, contractAddress, addressOfPeople);
  var rPeriod = conObj.remPeriod;
  var csBalance = conObj.curSingleBalance;
  res.send({remPeriod: rPeriod, curSingleBalance: csBalance });
});

module.exports = router;
