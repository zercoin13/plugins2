/*:
 * @plugindesc v1.0 Sistema de Relaciones Sociales por NPC
 * @author FLUX
 *
 * @help
 * Comandos:
 *
 * RelAdd Nombre Stat Cantidad
 * RelCheck Nombre Stat VariableID
 *
 * Stats válidos:
 * Amor
 * Lujuria
 * Corrupcion
 * Confianza
 *
 * Ejemplo:
 * RelAdd Angela Amor 5
 * RelCheck Angela Amor 10
 */

(function(){

var Relations = {};
Relations.data = {};

//━━━━━━━━━━━━━━━━━━
// COMANDO PLUGIN
//━━━━━━━━━━━━━━━━━━
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if(command === "RelAdd"){
        var name = args[0];
        var stat = args[1];
        var value = Number(args[2]);
        addRelation(name, stat, value);
    }

    if(command === "RelCheck"){
        var name = args[0];
        var stat = args[1];
        var varId = Number(args[2]);
        checkRelation(name, stat, varId);
    }
};

function initNPC(name){
    if(!Relations.data[name]){
        Relations.data[name] = {
            Amor:0,
            Lujuria:0,
            Corrupcion:0,
            Confianza:0
        };
    }
}

function addRelation(name, stat, value){
    initNPC(name);
    if(Relations.data[name][stat] !== undefined){
        Relations.data[name][stat] += value;
        if(Relations.data[name][stat] < 0) Relations.data[name][stat] = 0;
    }
}

function checkRelation(name, stat, varId){
    initNPC(name);
    var val = Relations.data[name][stat] || 0;
    $gameVariables.setValue(varId, val);
}

//━━━━━━━━━━━━━━━━━━
// GUARDADO
//━━━━━━━━━━━━━━━━━━
var _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function(){
    var c = _DataManager_makeSaveContents.call(this);
    c.relationsData = Relations.data;
    return c;
};

var _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(c){
    _DataManager_extractSaveContents.call(this, c);
    Relations.data = c.relationsData || {};
};

})();
