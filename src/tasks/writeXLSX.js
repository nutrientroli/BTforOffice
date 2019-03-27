'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

//Behavior Tree implementation
const writeXLSX = new Task({
  start: function(blackboard) {
    this.list = blackboard.params[blackboard.keys[blackboard.indexKey][0]];
    this.file = blackboard.params[blackboard.keys[blackboard.indexKey][1]];
  },
  end: function(blackboard) {
    blackboard.indexKey++;
  },
  run: function(blackboard) {
    var worksheet = XLSX.utils.aoa_to_sheet(this.list);
    var workbook = XLSX.utils.book_new();
    workbook.SheetNames.push('result');
    workbook.Sheets['result'] = worksheet;
    XLSX.writeFile(workbook, this.file);
    return SUCCESS;
  }
});

//References
BehaviorTree.register('writeXLSX', writeXLSX);
module.exports = writeXLSX;

//Extra functions
//...
