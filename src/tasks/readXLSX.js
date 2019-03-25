'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

const readXLSX = new Task({
  start: function(blackboard) {
    this.file = blackboard.readfile;
  },
  end: function(blackboard) {
    blackboard.list = this.list;
  },
  run: function(blackboard) {
    this.list = [];
    var workbook = XLSX.readFile(this.file);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var range = {s: {c:0, r:0}, e: {c:4, r:4 }}; //calculate?
    for(var R = range.s.r; R <= range.e.r; ++R) {
      let localList = [];
      for(var C = range.s.c; C <= range.e.c; ++C) {
        let cell_address = {c:C, r:R};
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        if (worksheet[cell_ref]) localList.push(worksheet[cell_ref].v);
        else localList.push('');
      }
      this.list.push(localList);
    }
    if(!this.list) return FAILURE;
    return SUCCESS;
  }
});

BehaviorTree.register('readXLSX', readXLSX);

module.exports = readXLSX;
