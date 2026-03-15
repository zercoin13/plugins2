/*:
 * @plugindesc v3.0 Registro de NPCs + Menú Agenda (Tecla J)
 * @author FLUX
 *
 * @help
 * Plugin Commands:
 * RegisterNPC Nombre
 * IsNPCRegistered Nombre IDVariable
 */

(function(){

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATOS
//━━━━━━━━━━━━━━━━━━━━━━━━━━
var NPCRegister = {};
NPCRegister.data = {};
NPCRegister.nextId = 1;

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// INPUT TECLA J
//━━━━━━━━━━━━━━━━━━━━━━━━━━
Input.keyMapper[74] = "agenda"; // J

var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    _Scene_Map_update.call(this);
    if(Input.isTriggered("agenda")){
        SceneManager.push(Scene_Agenda);
    }
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMANDOS
//━━━━━━━━━━━━━━━━━━━━━━━━━━
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if(command === "RegisterNPC"){
        var name = args.join(" ");
        registerNPC(name);
    }

    if(command === "IsNPCRegistered"){
        var name = args.slice(0, args.length-1).join(" ");
        var varId = Number(args[args.length-1]);
        checkNPC(name, varId);
    }
};

function registerNPC(name){
    for(var id in NPCRegister.data){
        if(NPCRegister.data[id].name === name) return;
    }
    var id = NPCRegister.nextId++;
    NPCRegister.data[id] = { name: name };
    if(SceneManager._scene && SceneManager._scene.showNPCRegister){
        SceneManager._scene.showNPCRegister(name);
    }
}

function checkNPC(name, varId){
    var found = false;
    for(var id in NPCRegister.data){
        if(NPCRegister.data[id].name === name){ found=true; break; }
    }
    $gameVariables.setValue(varId, found ? 1 : 0);
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// GUARDADO
//━━━━━━━━━━━━━━━━━━━━━━━━━━
var _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function(){
    var contents = _DataManager_makeSaveContents.call(this);
    contents.npcRegister = NPCRegister.data;
    contents.npcRegisterNextId = NPCRegister.nextId;
    return contents;
};

var _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
    _DataManager_extractSaveContents.call(this, contents);
    NPCRegister.data = contents.npcRegister || {};
    NPCRegister.nextId = contents.npcRegisterNextId || 1;
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// VENTANA LISTA
//━━━━━━━━━━━━━━━━━━━━━━━━━━
function Window_AgendaList(){ this.initialize.apply(this, arguments); }
Window_AgendaList.prototype = Object.create(Window_Selectable.prototype);
Window_AgendaList.prototype.constructor = Window_AgendaList;

Window_AgendaList.prototype.initialize = function(){
    Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.refresh();
    this.activate();
};

Window_AgendaList.prototype.maxItems = function(){
    return Object.keys(NPCRegister.data).length;
};

Window_AgendaList.prototype.drawItem = function(index){
    var id = Object.keys(NPCRegister.data)[index];
    var name = NPCRegister.data[id].name;
    var rect = this.itemRect(index);
    this.drawText(name, rect.x+10, rect.y, rect.width);
};

Window_AgendaList.prototype.refresh = function(){
    this.createContents();
    this.drawAllItems();
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// ESCENA AGENDA
//━━━━━━━━━━━━━━━━━━━━━━━━━━
function Scene_Agenda(){ this.initialize.apply(this, arguments); }
Scene_Agenda.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Agenda.prototype.constructor = Scene_Agenda;

Scene_Agenda.prototype.initialize = function(){
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Agenda.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);
    this._listWindow = new Window_AgendaList();
    this._listWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._listWindow);
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━
// SPRITE NOTIFICACIÓN
//━━━━━━━━━━━━━━━━━━━━━━━━━━
function Sprite_NPCRegister(){ this.initialize.apply(this, arguments); }
Sprite_NPCRegister.prototype = Object.create(Sprite.prototype);
Sprite_NPCRegister.prototype.constructor = Sprite_NPCRegister;

Sprite_NPCRegister.prototype.initialize = function(name){
    Sprite.prototype.initialize.call(this);
    var w=420,h=80; this._boxWidth=w;
    this.bitmap=new Bitmap(w,h);
    var ctx=this.bitmap.context;

    var grad=ctx.createLinearGradient(0,0,w,0);
    grad.addColorStop(0,"#151515");
    grad.addColorStop(1,"#2a2a2a");
    ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);

    ctx.strokeStyle="#ffb347"; ctx.lineWidth=2; ctx.strokeRect(0,0,w,h);

    this.bitmap.fontSize=14; this.bitmap.textColor="#ffcc88";
    this.bitmap.drawText("NUEVA PERSONA REGISTRADA",10,4,w-20,20,"left");

    this.bitmap.fontSize=22; this.bitmap.textColor="#ffffff";
    this.bitmap.drawText(name,10,32,w-20,40,"left");

    this._time=0; this.opacity=0;
};

Sprite_NPCRegister.prototype.update=function(){
    Sprite.prototype.update.call(this);
    this._time++;
    var margin=20;
    var targetX=Graphics.width-this._boxWidth-margin;
    if(this._time<30){this.x=Math.max(this.x-20,targetX);this.opacity+=12;}
    else if(this._time>180){
        this.x+=20;this.opacity-=12;
        if(this.opacity<=0&&this.parent)this.parent.removeChild(this);
    }
};
Sprite_NPCRegister.prototype.onAdded=function(){this.x=Graphics.width;this.y=200;};

var _Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function(){
    _Scene_Base_update.call(this);
    if(this._npcQueue && this._npcQueue.length>0 && !this._npcActive){
        this._npcActive=true;
        var s=new Sprite_NPCRegister(this._npcQueue.shift());
        this.addChild(s); s.onAdded();
        this._npcSprite=s;
    }
    if(this._npcSprite && !this._npcSprite.parent){
        this._npcActive=false; this._npcSprite=null;
    }
};

Scene_Base.prototype.showNPCRegister=function(name){
    this._npcQueue=this._npcQueue||[];
    this._npcQueue.push(name);
};

})();
