'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

const writeXLSX = new Task({
  start: function(blackboard) {
    //if(blackboard.list == null) return FAILURE;
  },
  end: function(blackboard) { },
  run: function(blackboard) {
    console.log('writeFile');
    console.log(blackboard.list);
    /*var workbook = new Workbook();
    var worksheet = {};
    workbook.SheetNames.push('result');
    workbook.Sheets['result'] = worksheet;
    XLSX.writeFile(workbook, blackboard.writefile);*/

    return SUCCESS;
  }
});

BehaviorTree.register('writeXLSX', writeXLSX);

module.exports = writeXLSX;
