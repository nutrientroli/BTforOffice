'use strict'

const { BehaviorTree, Selector, Sequence, Task, SUCCESS, FAILURE } = require('behaviortree');

//Create TASK
const task1 = new Task({
	//Called before run
	start: function(blackboard) { /*blackboard.isStarted = true;*/ },
	//Called after run
	end: function(blackboard) { /*blackboard.isStarted = false;*/ },
	//Things you want the task to do
	run: function(blackboard) { 

		console.log('Hello World');
		return FAILURE; 
	}
});




//Test ------------------------
const task2 = new Task({
	//Called before run
	start: function(blackboard) { /*blackboard.isStarted = true;*/ },
	//Called after run
	end: function(blackboard) { /*blackboard.isStarted = false;*/ },
	//Things you want the task to do
	run: function(blackboard) { 

		console.log('Bye bye World');
		return SUCCESS; 
	}
});
//End Test ------------------------

//Create Selector
const selector1 = new Selector({
	nodes: ['action1', 'action2']
});



//Register Task, Sequences, ...
BehaviorTree.register('action1', task1);
BehaviorTree.register('action2', task2);
BehaviorTree.register('first', selector1);



//Create blackboard
var bb; //new Class


//Create BT instance
var bt = new BehaviorTree({
	tree: selector1, //first composite
	blackboard: bb
});


setInterval(function(){
	bt.step()
}, 500)