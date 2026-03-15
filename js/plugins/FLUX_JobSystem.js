/*:
 * @plugindesc v2.1 Sistema de Trabajos estable (compatible con Banking)
 * @author FLUX
 */

(function(){

window.JobDB = window.JobDB || {};
window.PlayerJob = window.PlayerJob || null;

//━━━━━━━━━━━━━━━━━━
// CREAR TRABAJO
//━━━━━━━━━━━━━━━━━━
function createJob(name, type, pay, desc){
    JobDB[name] = { name:name, type:type, pay:Number(pay), desc:desc };
}

//━━━━━━━━━━━━━━━━━━
// ACEPTAR
//━━━━━━━━━━━━━━━━━━
function acceptJob(name){
    var job = JobDB[name];
    if(!job) return;

    if(PlayerJob && PlayerJob.type === "fijo") return;

    PlayerJob = JSON.parse(JSON.stringify(job));
    PlayerJob.onDuty = false;
}

//━━━━━━━━━━━━━━━━━━
// RENUNCIAR
//━━━━━━━━━━━━━━━━━━
function quitJob(){
    PlayerJob = null;
}

//━━━━━━━━━━━━━━━━━━
// INICIAR TURNO
//━━━━━━━━━━━━━━━━━━
function startShift(){
    if(!PlayerJob || PlayerJob.onDuty) return;
    PlayerJob.onDuty = true;
    $gameTemp.reserveCommonEvent(1);
}

//━━━━━━━━━━━━━━━━━━
// PAGOS (USA PLUGIN BANKING)
//━━━━━━━━━━━━━━━━━━
window.JobPayCash = function(){
    if(!PlayerJob || !PlayerJob.onDuty) return;
    if(window.Banking){
        Banking.addCash(PlayerJob.pay);   // Variable 2000
    }
    PlayerJob.onDuty = false;
};

window.JobPayBank = function(){
    if(!PlayerJob || !PlayerJob.onDuty) return;
    if(window.Banking){
        Banking.addBank(PlayerJob.pay);   // Variable 2001
    }
    PlayerJob.onDuty = false;
};

//━━━━━━━━━━━━━━━━━━
// GUARDADO
//━━━━━━━━━━━━━━━━━━
var _make = DataManager.makeSaveContents;
DataManager.makeSaveContents = function(){
    var c=_make.call(this);
    c.JobDB=JobDB;
    c.PlayerJob=PlayerJob;
    return c;
};

var _load = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(c){
    _load.call(this,c);
    JobDB=c.JobDB||{};
    PlayerJob=c.PlayerJob||null;
};

//━━━━━━━━━━━━━━━━━━
// PLUGIN COMMANDS
//━━━━━━━━━━━━━━━━━━
var _pc=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand=function(command,args){
    _pc.call(this,command,args);

    if(command==="JobAdd"){
        var name=args[0], type=args[1], pay=args[2];
        var desc=args.slice(3).join(" ");
        createJob(name,type,pay,desc);
    }

    if(command==="JobAccept") acceptJob(args[0]);
    if(command==="JobQuit") quitJob();
    if(command==="JobStartShift") startShift();
};

//━━━━━━━━━━━━━━━━━━
// TECLA U
//━━━━━━━━━━━━━━━━━━
Input.keyMapper[85] = "jobMenu";

var _mapUpdate=Scene_Map.prototype.update;
Scene_Map.prototype.update=function(){
    _mapUpdate.call(this);
    if(Input.isTriggered("jobMenu")){
        SceneManager.push(Scene_JobMenu);
    }
};

//━━━━━━━━━━━━━━━━━━
// ESCENA MENÚ
//━━━━━━━━━━━━━━━━━━
function Scene_JobMenu(){ this.initialize.apply(this, arguments); }
Scene_JobMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_JobMenu.prototype.constructor = Scene_JobMenu;

Scene_JobMenu.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);

    this._infoWindow = new Window_JobInfo(0,0,Graphics.width,Graphics.height-180);
    this.addWindow(this._infoWindow);

    this._commandWindow = new Window_JobCommands(0,Graphics.height-180,Graphics.width,180);
    this._commandWindow.setHandler('shift', this.onShift.bind(this));
    this._commandWindow.setHandler('quit', this.onQuit.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);

    this._commandWindow.activate();
};

Scene_JobMenu.prototype.onQuit = function(){
    quitJob();
    this._infoWindow.refresh();
    this._commandWindow.refresh();
    this._commandWindow.activate();
};

Scene_JobMenu.prototype.onShift = function(){
    startShift();
    this.popScene();
};

//━━━━━━━━━━━━━━━━━━
// INFO
//━━━━━━━━━━━━━━━━━━
function Window_JobInfo(){ this.initialize.apply(this, arguments); }
Window_JobInfo.prototype = Object.create(Window_Base.prototype);
Window_JobInfo.prototype.constructor = Window_JobInfo;

Window_JobInfo.prototype.initialize = function(x,y,w,h){
    Window_Base.prototype.initialize.call(this,x,y,w,h);
    this.refresh();
};

Window_JobInfo.prototype.refresh = function(){
    this.contents.clear();
    this.drawText("TRABAJO ACTUAL",0,0,this.contents.width,"center");

    if(!PlayerJob){
        this.drawText("No tienes empleo.",0,80,this.contents.width,"center");
        return;
    }

    var y=80;
    this.drawText("Nombre: "+PlayerJob.name,40,y); y+=36;
    this.drawText("Tipo: "+PlayerJob.type,40,y); y+=36;
    this.drawText("Pago por turno: $"+PlayerJob.pay,40,y); y+=36;
    this.drawText("Estado: "+(PlayerJob.onDuty ? "En turno" : "Fuera de turno"),40,y); y+=36;
    this.drawTextEx(PlayerJob.desc,40,y);
};

//━━━━━━━━━━━━━━━━━━
// COMANDOS
//━━━━━━━━━━━━━━━━━━
function Window_JobCommands(){ this.initialize.apply(this, arguments); }
Window_JobCommands.prototype = Object.create(Window_Command.prototype);
Window_JobCommands.prototype.constructor = Window_JobCommands;

Window_JobCommands.prototype.makeCommandList = function(){
    if(PlayerJob && !PlayerJob.onDuty) this.addCommand("Ir a trabajar",'shift');
    if(PlayerJob) this.addCommand("Renunciar",'quit');
    this.addCommand("Cerrar",'cancel');
};

})();
