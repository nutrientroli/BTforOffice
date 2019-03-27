'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');

/*
* The parameters are defined in the json file.
* Each task has a number of fixed parameters.
* The parameters can be indexed.
*/

//Behavior Tree implementation
const nameTask = new Task({
  start: function(blackboard) {
    //Calls before run.
    //InParams setup.
    //Ex: this.var = blackboard.params[blackboard.keys[blackboard.indexKey][0]];
  },
  end: function(blackboard) {
    //Calls after run.
    //OutParams setup.
    //Ex: blackboard.params[blackboard.keys[blackboard.indexKey][0]] = this.var;
    blackboard.indexKey++; //to indicate the change of task.
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
//function extraFunctions() {}
