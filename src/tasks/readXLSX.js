'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

//Behavior Tree implementation
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
    var ref = worksheet['!ref'].split(':');
    var range = {s: XLSX.utils.decode_cell(ref[0]), e: XLSX.utils.decode_cell(ref[1])};
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

//References
BehaviorTree.register('readXLSX', readXLSX);
module.exports = readXLSX;

//Extra functions
//...
