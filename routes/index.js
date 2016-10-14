var express = require('express');
var getMainData = require('./getMainData.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(__dirname);
	var addrOfMe = "0x912012121f4d273782ed648f7a8facf8e6e05571";
	var filename = 'coinBox.sol';
	var contractName = 'PigBox';
	var contractAddress = '0x22b5df29d1c26e93bf95ec961bf3bf21c7f1363c';
	var contractInfo = getMainData(addrOfMe, filename, contractName, contractAddress);
	var nPeople = contractInfo.numPeople;
	var cBalance = contractInfo.curBalance;
	res.send({numPeople: nPeople  , curBalance:cBalance});
});

module.exports = router;
