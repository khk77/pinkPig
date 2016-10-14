//web3 관련 모듈 호출
var Web3 = require('web3');
var web3 = new Web3();
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
  var demoAbi = compiledSource[targetContract].info.abiDefinition;
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
module.exports = function(addrs, filename, contractName, contractAddr){
  var obj = _getContractObject(addrs, filename, contractName);
  var contractObj = obj["contract"].at(contractAddr);
  var nPeople = contractObj.numOfSaving.call().toString();
  var cBalance = contractObj.currentAmount.call().toString();
  return {numPeople: nPeople, curBalance: cBalance};
}
