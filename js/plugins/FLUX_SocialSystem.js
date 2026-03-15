/*:
 * @plugindesc v1.7 Sistema Social UI Pro
 * @author FLUX
 */

(function(){

window.SocialDB = window.SocialDB || {};

//━━━━━━━━━━━━━━━━━━
// CREAR NPC
//━━━━━━━━━━━━━━━━━━
function createNPC(name, face, age, desc){
    if(!SocialDB[name]){
        SocialDB[name] = { face:face||"", age:age||"", desc:desc||"",
            Amor:0,Lujuria:0,Corrupcion:0,Confianza:0 };
        showNPCUnlock(name);
    }
}

//━━━━━━━━━━━━━━━━━━
// NOTIFICACIÓN
//━━━━━━━━━━━━━━━━━━
function showNPCUnlock(name){
    SceneManager._scene.addChild(new Sprite_NPCUnlock(name));
}

function Sprite_NPCUnlock(name){ this.initialize(name); }
Sprite_NPCUnlock.prototype = Object.create(Sprite.prototype);
Sprite_NPCUnlock.prototype.constructor = Sprite_NPCUnlock;

Sprite_NPCUnlock.prototype.initialize = function(name){
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(420,90);
    this.x = Graphics.width-440;
    this.y = 20;
    this.opacity=0; this._d=180;

    var b=this.bitmap;
    b.fillRect(0,0,420,90,"rgba(60,60,60,0.95)");
    b.fillRect(0,0,420,4,"#cc5500");
    b.fillRect(0,86,420,4,"#cc5500");
    b.fillRect(0,0,4,90,"#cc5500");
    b.fillRect(416,0,4,90,"#cc5500");
    b.textColor="#fff"; b.fontSize=22;
    b.drawText("Nueva persona desbloqueada",0,15,420,28,"center");
    b.fontSize=26; b.drawText(name,0,48,420,28,"center");
};

Sprite_NPCUnlock.prototype.update=function(){
    Sprite.prototype.update.call(this);
    if(this._d>120) this.opacity+=15;
    else if(this._d<60) this.opacity-=5;
    this._d--; if(this._d<=0) this.parent.removeChild(this);
};

//━━━━━━━━━━━━━━━━━━
// COMANDOS
//━━━━━━━━━━━━━━━━━━
var _pc=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand=function(c,a){
    _pc.call(this,c,a);
    if(c==="RegisterNPC"){
        var d=a.join(" ").split("|");
        createNPC(d[0],d[1],d[2],d[3]);
    }
    if(c==="RelAdd"){
        var n=a[0], s=a[1], v=Number(a[2]);
        if(SocialDB[n]&&SocialDB[n][s]!=null){
            SocialDB[n][s]=Math.max(0,Math.min(100,SocialDB[n][s]+v));
        }
    }
};

//━━━━━━━━━━━━━━━━━━
// GUARDADO
//━━━━━━━━━━━━━━━━━━
var _ms=DataManager.makeSaveContents;
DataManager.makeSaveContents=function(){var c=_ms.call(this);c.socialDB=SocialDB;return c;};
var _es=DataManager.extractSaveContents;
DataManager.extractSaveContents=function(c){_es.call(this,c);SocialDB=c.socialDB||{};};

//━━━━━━━━━━━━━━━━━━
// TECLA J
//━━━━━━━━━━━━━━━━━━
Input.keyMapper[74]="socialMenu";
var _smu=Scene_Map.prototype.update;
Scene_Map.prototype.update=function(){
    _smu.call(this);
    if(Input.isTriggered("socialMenu")) SceneManager.push(Scene_SocialMenu);
};

//━━━━━━━━━━━━━━━━━━
// ESCENA
//━━━━━━━━━━━━━━━━━━
function Scene_SocialMenu(){this.initialize.apply(this,arguments);}
Scene_SocialMenu.prototype=Object.create(Scene_MenuBase.prototype);
Scene_SocialMenu.prototype.constructor=Scene_SocialMenu;

Scene_SocialMenu.prototype.create=function(){
    Scene_MenuBase.prototype.create.call(this);

    this._list=new Window_SocialList(0,0,260,Graphics.height);
    this._list.setHandler('ok',this.onOk.bind(this));
    this._list.setHandler('cancel',this.popScene.bind(this));
    this.addWindow(this._list);

    // Ventana MÁS PEQUEÑA Y CENTRADA
    const w=Graphics.width-320;
    const h=Graphics.height-120;
    this._info=new Window_SocialInfo(290,60,w,h);
    this.addWindow(this._info);
};

Scene_SocialMenu.prototype.onOk=function(){
    this._info.setNPC(this._list.currentName());
    this._list.activate();
};

//━━━━━━━━━━━━━━━━━━
// LISTA
//━━━━━━━━━━━━━━━━━━
function Window_SocialList(){this.initialize.apply(this,arguments);}
Window_SocialList.prototype=Object.create(Window_Command.prototype);
Window_SocialList.prototype.constructor=Window_SocialList;
Window_SocialList.prototype.windowWidth=function(){return 260;};
Window_SocialList.prototype.makeCommandList=function(){
    Object.keys(SocialDB).forEach(n=>this.addCommand(n,'ok'));
};
Window_SocialList.prototype.currentName=function(){return this.commandName(this.index());};

//━━━━━━━━━━━━━━━━━━
// INFO NPC
//━━━━━━━━━━━━━━━━━━
function Window_SocialInfo(){this.initialize.apply(this,arguments);}
Window_SocialInfo.prototype=Object.create(Window_Base.prototype);
Window_SocialInfo.prototype.constructor=Window_SocialInfo;

Window_SocialInfo.prototype.setNPC=function(name){
    this.contents.clear();
    var npc=SocialDB[name]; if(!npc) return;

    const centerX=this.contents.width/2;
    const imgSize=144;

    // IMAGEN CENTRADA ARRIBA
    var bmp=ImageManager.loadPicture(npc.face);
    bmp.addLoadListener(function(){
        var s=Math.min(bmp.width,bmp.height);
        this.contents.blt(bmp,(bmp.width-s)/2,(bmp.height-s)/2,s,s,
            centerX-imgSize/2,10,imgSize,imgSize);
    }.bind(this));

    let y=170;

    // TEXTO CENTRADO
    this.drawText(name,0,y,this.contents.width,"center"); y+=30;
    this.drawText("Edad: "+npc.age,0,y,this.contents.width,"center"); y+=30;
    this.drawTextEx(npc.desc,40,y); y+=this.calcTextHeight({text:npc.desc},false)+20;

    // BARRAS DEBAJO
    this.drawGaugeLine("Amor",npc.Amor,y); y+=35;
    this.drawGaugeLine("Lujuria",npc.Lujuria,y); y+=35;
    this.drawGaugeLine("Corrupcion",npc.Corrupcion,y); y+=35;
    this.drawGaugeLine("Confianza",npc.Confianza,y);
};

Window_SocialInfo.prototype.drawGaugeLine=function(label,val,y){
    const x=80,w=this.contents.width-160;
    this.drawText(label,x,y,120);
    this.contents.fillRect(x+120,y+10,w-140,12,"#333");
    this.contents.fillRect(x+120,y+10,(w-140)*(val/100),12,"#ff8844");
    this.drawText(val+"/100",x+w-20,y,60,"right");
};

})();
