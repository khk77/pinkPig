var express = require('express');
var getSingldData = require('./getSingleData.js');
var router = express.Router();


/* GET home page. */
router.get('/:address', function(req, res, next) {
  var addressOfPeople = req.params.address;
  // console.log(addressOfPeople);
  var addrOfMe = "0x912012121f4d273782ed648f7a8facf8e6e05571";
  var filename = './coinBox.sol';
  var contractName = 'PigBox';
  var contractAddress = '0x22b5df29d1c26e93bf95ec961bf3bf21c7f1363c';
  var conObj = getSingldData(addrOfMe, filename, contractName, contractAddress, addressOfPeople);
  var rPeriod = conObj.remPeriod;
  var csBalance = conObj.curSingleBalance;
  res.send({remPeriod: rPeriod, curSingleBalance: csBalance });
});

module.exports = router;
