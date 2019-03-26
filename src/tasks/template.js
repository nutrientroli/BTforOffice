'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');

//Behavior Tree implementation
const nameTask = new Task({
  start: function(blackboard) {
    //Calls before run.
    //InParams setup.
  },
  end: function(blackboard) {
    //Calls after run.
    //OutParams setup.
  },
  run: function(blackboard) {
    //Do something...
    return SUCCESS;
  }
});

//References
BehaviorTree.register('nameTask', nameTask);
module.exports = nameTask;

//Extra functions
function extraFunctions() {}
