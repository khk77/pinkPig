var express = require('express');
var getMainData = require('./getMainData.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(__dirname);
	var addrOfMe = "0x912012121f4d273782ed648f7a8facf8e6e05571";
	var filename = 'coinBox.sol';
	var contractName = 'PigBox';
	var contractAddress = '0x8d947d2d91480f0ed183429308596fa4efa2240f';
	var contractInfo = getMainData(addrOfMe, filename, contractName, contractAddress);
	var nPeople = contractInfo.numPeople;
	var cBalance = contractInfo.curBalance;
	res.send({numPeople: nPeople  , curBalance:cBalance});
});

module.exports = router;
