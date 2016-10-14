var express = require('express');
var getMainData = require('./getMainData.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(__dirname);
	var addrOfMe = '0xe648fce5ad5989d38236057af4912965c490bb93';
	var filename = 'coinBox.sol';
	var contractName = 'PigBox';
	var contractAddress = '0x655501aa639bc446d26dd434b75ade855d2d23bc';
	var contractInfo = getMainData(addrOfMe, filename, contractName, contractAddress);
	var nPeople = contractInfo.numPeople;
	var cBalance = contractInfo.curBalance;
	res.send({numPeople: nPeople  , curBalance:cBalance});
});

module.exports = router;
