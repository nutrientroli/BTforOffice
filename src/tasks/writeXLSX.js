'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

//Behavior Tree implementation
const writeXLSX = new Task({
  start: function(blackboard) {
    this.list = blackboard.list;
    this.file = blackboard.writefile;
  },
  end: function(blackboard) { },
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
