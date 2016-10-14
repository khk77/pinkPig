//web3 관련 모듈 호출
var Web3 = require('web3');
var web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider("http://52.78.165.188:60000"));
web3.setProvider(new web3.providers.HttpProvider());
//fileReader
var fs = require('fs');

//콘트렉트 객체 호출
function _getContractObject(addressOfDeployer, filename, targetContract){
  var demoSource = fs.readFileSync(__dirname+'/'+filename, 'utf8');
  // console.log(demoSource);

  //콘트렉트 생성 위한 각종 정보 호출
  var compiledSource = web3.eth.compile.solidity(demoSource);
  // console.log(compiledSource);
  //abi정보
  // console.log(compiledSource[targetContract]);
  var demoAbi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"saved","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"save","outputs":[{"name":"time","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"expirePassed","type":"bool"},{"name":"saver","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numOfSaving","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimalDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getListSavings","outputs":[{"name":"amountNow","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"returnSavings","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"currentAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"payable":true,"type":"fallback"}]
;
  //배포할 EOA
  // var deployerAddress= web3.eth.accounts[0];
  //democracy가 받아올 토큰 주소
  // var jshTokenAddress = "0x14bac882dc4461ab6388956a53a5e8a96e4ac00a";
  //데모용 콘트렉트
  var demoContract = web3.eth.contract(demoAbi);


  //배포용 객체
  var deployInfo = {
    from : addressOfDeployer,
    data : compiledSource[targetContract].code,
    gas : 1500000
  };

  return {
    "contract" :demoContract,
    "compiledSource" : compiledSource,
    "abiInfo" : demoAbi,
    "deployInfo" : deployInfo
  };
};

//@params (사용자주소, 파일이름, 콘트렉트이름, 콘트렉트주소)
//@returns (numPeople : 총 저축한 사람 숫자, curBalance : 현재 잔액)
//시간은 만기일의 유닉스 타임(GMT), 금액은 Wei
module.exports = function(addrs, filename, contractName, contractAddr, userAddrss){
  var obj = _getContractObject(addrs, filename, contractName);
  var contractObj = obj["contract"].at(contractAddr);
  // var nPeople = contractObj.numOfSaving.call().toString();
  // var cBalance = ontractObj.currentAmount.call().toString();
  var rPeriod = contractObj.save(userAddrss)[1].toString();
  // console.log(userAddrss);
  // console.log(rPeriod);
  // var csBalance = contractObj.save(userAddrss)[2].toString();
  var calldata = contractObj.getListSavings.getData(userAddrss);
  var csBalance = contractObj.getListSavings(userAddrss, {from : addrs});
  console.log(contractObj.save(userAddrss));
  return {remPeriod: rPeriod, curSingleBalance: csBalance};
}
