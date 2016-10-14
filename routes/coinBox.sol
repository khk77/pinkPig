pragma solidity ^0.4.0;

contract PigBox{

  //최소 저금액
  uint public minimalDeposit;
  //저금횟수
  uint public numOfSaving;
  //총 저축액
  uint public currentAmount;
  //저축한 사람 여부
  mapping(address => bool) public saved;
  //저축한 사람의 저축
  /*Saving[] savings;*/
  mapping(address => Saving) public save;

  struct Saving{
    uint time; // 저축한 시간
    uint deadline; // 만기일
    uint amount; //금액
    bool expirePassed; //만기지났는지여부
    address saver; //저축한사람
  }

  function() payable {
    /*uint savingID = savings.length++;*/
    Saving s = save[msg.sender];
    s.time = now;
    s.deadline = now + 5 minutes;
    s.amount += msg.value;
    s.expirePassed = false;
    s.saver = msg.sender;
    numOfSaving += 1;
    currentAmount += msg.value;
    saved[msg.sender] = true;
    /*return savingID;*/
    /*this.balance += msg.value;*/
  }

  modifier onlySaved{
    if (saved[msg.sender] == false) throw;
    _;
  }

  function returnSavings() onlySaved payable {
    Saving p = save[msg.sender];
    if (p.saver != msg.sender || now < p.deadline)
      throw;
    p.amount = 0;
    currentAmount -= p.amount;
    p.expirePassed = true;
    numOfSaving -= 1;
    if(!p.saver.call.value(p.amount)())
      throw;
  }

  //현재 잔액을 리턴
  function getBalance() constant returns (uint bal) { return currentAmount; }

  //저축 고유번호를 리턴
  function getListSavings(address addr) constant returns(uint amountNow){
    Saving s = save[addr];
    amountNow = s.amount;
    return amountNow;
  }
}
