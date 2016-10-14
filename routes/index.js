var express = require('express');
var getMainData = require('./getMainData.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(__dirname);
	var addrOfMe = "0xe648fce5ad5989d38236057af4912965c490bb93";
	var filename = 'coinBox.sol';
	var contractName = 'PigBox';
	var contractAddress = '0xa133abfbc75434249d9726c86671ead6ea6a49cd';
	var contractInfo = getMainData(addrOfMe, filename, contractName, contractAddress);
	var nPeople = contractInfo.numPeople;
	var cBalance = contractInfo.curBalance;
	res.send({numPeople: nPeople  , curBalance:cBalance});
});

module.exports = router;
