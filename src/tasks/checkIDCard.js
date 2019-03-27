'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');

//Behavior Tree implementation
const checkIDCard = new Task({
  start: function(blackboard) {
    this.list = blackboard.params[blackboard.keys[blackboard.indexKey][0]];
    this.index = blackboard.params[blackboard.keys[blackboard.indexKey][1]];
  },
  end: function(blackboard) {
    blackboard.params[blackboard.keys[blackboard.indexKey][0]] = this.list;
    blackboard.indexKey++;
  },
  run: function(blackboard) {
    for(let r = 0; r < this.list.length; r++) {
      this.list[r].push(checkNIF(this.list[r][this.index]));
    }
    return SUCCESS;
  }
});

//References
BehaviorTree.register('checkIDCard', checkIDCard);
module.exports = checkIDCard;

//Extra functions
function checkNIF(nif) {
    nif = nif.toUpperCase().replace(/[\s\-]+/g,'');
    if(/^(\d|[XYZ])\d{7}[A-Z]$/.test(nif)) {
        var num = nif.match(/\d+/);
        num = (nif[0]!='Z'? nif[0]!='Y'? 0: 1: 2)+num;
        if(nif[8]=='TRWAGMYFPDXBNJZSQVHLCKE'[num%23]) {
            return /^\d/.test(nif)? 'DNI': 'NIE';
        }
    } else if(/^[ABCDEFGHJKLMNPQRSUVW]\d{7}[\dA-J]$/.test(nif)) {
        for(var sum=0,i=1;i<8;++i) {
            var num = nif[i]<<i%2;
            var uni = num%10;
            sum += (num-uni)/10+uni;
        }
        var c = (10-sum%10)%10;
        if(nif[8]==c || nif[8]=='JABCDEFGHI'[c]) {
            return /^[KLM]/.test(nif)? 'ESP': 'CIF';
        }
    }
    return 'ERROR';
}
