'use strict'

const { BehaviorTree, BehaviorTreeImporter } = require('behaviortree');
const bb = require('./config/blackboard');
const json = require('./config/tree.json');

//Tasks
const readXLSX = require('./tasks/readXLSX');
const writeXLSX = require('./tasks/writeXLSX');
const checkIDCard = require('./tasks/checkIDCard');
const upperCase = require('./tasks/upperCase');

var importer = new BehaviorTreeImporter();

var bt = new BehaviorTree({
  tree: importer.parse(json),
  blackboard: bb
});

bt.step();
