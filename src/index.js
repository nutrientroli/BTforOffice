'use strict'

const { BehaviorTree, Selector, Sequence, Task, SUCCESS, FAILURE } = require('behaviortree');
const XLSX = require('xlsx');
const utf8 = require('utf8');

const config = require('./config/config');



//La idea es dividir en TASK las diferentes tareas de lectura de fichero.

//Propuesta 1:
//Buscar fichero por nombre especifico. (tarea 1) param -> out.file
//Leer y Cargar todas las filas en una array o lista. (tarea2) param -> in.file + out.list
//[Tarea más variable] Comprovación de la lista (tarea3) param -> in.list out.listprocessed
//Crear fichero de respuesta (tarea4) param -> in.listprocessed

//Mensaje de error (tarea5) param -> in.message



//Create TASK
const readCSV = new Task({
	//Called before run
	start: function(blackboard) { /*blackboard.isStarted = true;*/ },
	//Called after run
	end: function(blackboard) { /*blackboard.isStarted = false;*/ },
	//Things you want the task to do
	run: function(blackboard) { 
		
		//INPUT_PARAMETERS:
		var columns = [
			{ column: 'A', valor: '1'},
			{ column: 'B', valor: '2'}
		];

		//OUTPUT_PARAMETERS:
		var list = [];

		var workbook = XLSX.readFile(config.file); //Cargamos fichero
		var first_sheet_name = workbook.SheetNames[0]; //obtenemos referencia a la hoja
		var worksheet = workbook.Sheets[first_sheet_name]; //obtenemos la hoja
		var row = 1; //fila inicial.
		var actualCell; //variable de celda actual.
		for(actualCell = worksheet['A'+row]; actualCell; ){
			var dades = [];
			for(let i=0; i<columns.length; i++){
				let data = columns[i].valor;
				let col = columns[i].column;
				col = col + row;
				if(worksheet[col]) dades[data] = worksheet[col].v;
				else dades[data] = '';
			}
			row++;
			actualCell = worksheet['A'+row];
			console.log(dades);
		}
		console.log('end');
		return SUCCESS; 
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
BehaviorTree.register('action1', readCSV);
BehaviorTree.register('action2', task2);
BehaviorTree.register('first', selector1);



//Create blackboard
var bb; //new Class


//Create BT instance
var bt = new BehaviorTree({
	tree: selector1, //first composite
	blackboard: bb
});

bt.step();

/*setInterval(function(){
	bt.step()
}, 5000)*/