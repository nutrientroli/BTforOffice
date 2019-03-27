blackboard = {};

blackboard.params = []; //key-value
blackboard.keys = []; //keys to Call Tasks
blackboard.indexKey = 0; //Join variable Tasks-Blackboard Params.

blackboard.setup = function(json) {
  let aParams = [];
  for(let i=0; i<json['nodes'].length; i++){
    aParams.push(json['nodes'][i]['params'][0]);
  }
  for(let i=0; i<aParams.length; i++){
    let aKeys = [];
    for (let key in aParams[i]){
        blackboard.addToParams(key, aParams[i][key], blackboard.params);
        aKeys.push(key);
    }
    blackboard.keys.push(aKeys);
  }
  //console.log(blackboard.keys);
  //console.log(blackboard.params);
}

blackboard.addToParams = function(key, value, params){
  if(params[key] == undefined) params[key] = value;
  else if(params[key] != value && value != '') params[key] = value;
}

module.exports = blackboard;













//Library of Behavior Tree
//https://www.npmjs.com/package/behaviortree

//Node editors?
//https://github.com/paceholder/nodeeditor
//https://github.com/slothking-online/graphql-editor
//https://github.com/jchanvfx/NodeGraphQt
//https://github.com/antvis/g6
//https://www.behaviortrees.com/#/editor - https://github.com/adaptsource/behavior3editor
//https://github.com/lightsinthesky/react-node-graph
