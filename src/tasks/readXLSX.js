'use strict'

const { Task, SUCCESS, FAILURE, BehaviorTree } = require('behaviortree');
const XLSX = require('xlsx');

const readXLSX = new Task({
  start: function(blackboard) { },
  end: function(blackboard) { },
  run: function(blackboard) {
    console.log('read');
    //INPUT_PARAMETERS:
    var columns = [ { column: 'A', valor: '1' }, { column: 'B', valor: '2' } ]; //Hacer que sea dinamico.
    //OUTPUT_PARAMETERS:
    var list = [];

    var workbook = XLSX.readFile(blackboard.readfile); //Cargamos fichero
    var first_sheet_name = workbook.SheetNames[0]; //obtenemos referencia a la hoja
    var worksheet = workbook.Sheets[first_sheet_name]; //obtenemos la hoja
    var row = 1; //fila inicial.
    var cell; //variable de celda actual.

    for (cell = worksheet['A' + row]; cell;) { //Iteracion de filas.
      let localList = [];
      for (let i = 0; i < columns.length; i++) { //Iteracion de columnas.
        let col = columns[i].column;
        col += row;
        if (worksheet[col]) localList.push(worksheet[col].v);
        else localList.push('');
      }
      list.push(localList);
      row++;
      cell = worksheet['A' + row]; //Reset de columna.
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
