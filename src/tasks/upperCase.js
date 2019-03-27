'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');

//Behavior Tree implementation
const upperCase = new Task({
  start: function(blackboard) {
    this.list = blackboard.params[blackboard.keys[blackboard.indexKey][0]];
  },
  end: function(blackboard) {
    blackboard.params[blackboard.keys[blackboard.indexKey][0]] = this.list;
    blackboard.indexKey++;
  },
  run: function(blackboard) {
    for(let r = 0; r < this.list.length; r++) {
      for(let c = 0; c < this.list[r].length; c++) {
          this.list[r][c] = this.list[r][c].toUpperCase();
      }
    }
    return SUCCESS;
  }
});

//References
BehaviorTree.register('upperCase', upperCase);
module.exports = upperCase;

//Extra functions
