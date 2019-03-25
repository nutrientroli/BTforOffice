'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

const readXLSX = new Task({
  start: function(blackboard) { },
  end: function(blackboard) { },
  run: function(blackboard) {
    console.log('read');
    //INPUT_PARAMETERS:
    var range = {s: {c:0, r:0}, e: {c:4, r:4 }}; //calculate?
    //OUTPUT_PARAMETERS:
    var list = [];

    var workbook = XLSX.readFile(blackboard.readfile);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    for(var R = range.s.r; R <= range.e.r; ++R) {
      let localList = [];
      for(var C = range.s.c; C <= range.e.c; ++C) {
        let cell_address = {c:C, r:R};
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        if (worksheet[cell_ref]) localList.push(worksheet[cell_ref].v);
        else localList.push('');
      }
      list.push(localList);
    }
    if(list != null) {
      blackboard.list = list;
      return SUCCESS;
    }
    return FAILURE;
  }
});

BehaviorTree.register('readXLSX', readXLSX);

module.exports = readXLSX;
