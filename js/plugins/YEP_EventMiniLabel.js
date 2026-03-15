//=============================================================================
// Yanfly Engine Plugins - Event Mini Label (Solo Nombre)
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventMiniLabel = true;

var Yanfly = Yanfly || {};
Yanfly.EML = Yanfly.EML || {};
Yanfly.EML.version = 1.12;

//=============================================================================
// Definición de la Clase Window_EventMiniLabel
//=============================================================================
function Window_EventMiniLabel() {
    this.initialize.apply(this, arguments);
}

Window_EventMiniLabel.prototype = Object.create(Window_Base.prototype);
Window_EventMiniLabel.prototype.constructor = Window_EventMiniLabel;

// Métodos de Window_EventMiniLabel
Window_EventMiniLabel.prototype.initialize = function() {
    this._bufferX = 0;
    this._bufferY = 0;
    this._fontSize = 20;
    this._alwaysShow = false;
    var width = 136; // Ancho mínimo por defecto
    var height = this.windowHeight();
    this._range = 500;
    this._reqFacing = false;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._character = null;
    this._page = 0;
    this._text = '';
};

Window_EventMiniLabel.prototype.standardFontSize = function() {
    return this._fontSize !== undefined ? this._fontSize : 20;
};

Window_EventMiniLabel.prototype.windowHeight = function() {
    var height = this.fittingHeight(1);
    height = Math.max(height, 36 + this.standardPadding() * 2);
    return height;
};

Window_EventMiniLabel.prototype.setCharacter = function(character) {
    this.setText('');
    this._character = character;
    if (character._eventId) this.gatherDisplayData();
};

Window_EventMiniLabel.prototype.gatherDisplayData = function() {
    this._page = this._character.page();
    this._pageIndex = this._character._pageIndex;
    this._range = 500;
    this._bufferY = 0;
    this._fontSize = 20;
    this._alwaysShow = false;
    this._reqFacing = false;
    if (!this._character.page()) {
        return (this.visible = false);
    }
    var list = this._character.list();
    var max = list.length;
    var comment = '';
    for (var i = 0; i < max; ++i) {
        var ev = list[i];
        if ([108, 408].contains(ev.code)) comment += ev.parameters[0] + '\n';
    }
    this.extractNotedata(comment);
};

Window_EventMiniLabel.prototype.extractNotedata = function(comment) {
    if (comment === '') return;

    var tag1 = /<(?:MINI WINDOW|MINI LABEL):[ ](.*)>/i;

    var notedata = comment.split(/[\r\n]+/);
    var text = '';

    for (var i = 0; i < notedata.length; ++i) {
        var line = notedata[i];
        if (line.match(tag1)) {
            text = String(RegExp.$1);
        }
    }

    // Obtener el nombre del evento de forma compatible
    const event = $dataMap.events[this._character._eventId];
    const eventName = event ? event.name : null;

    // Depuración: Mostrar nombre del evento
    console.log(`Nombre del evento: ${eventName}`);

    if (!eventName) {
        console.warn(`El Evento ID ${this._character._eventId} no tiene un nombre definido.`);
        this.setText(text);
        return;
    }

    // Mostrar solo el nombre del evento
    this.setText(eventName); // Asegúrate de mostrar solo el nombre

    if (this._text === '' || !$gameSystem.isShowEventMiniLabel()) {
        this.visible = false;
        this.contentsOpacity = 0;
    } else {
        this.visible = true;
        if (this._reqFacing) {
            this.contentsOpacity = 0;
        } else {
            this.contentsOpacity = 255;
        }
    }
};

//=============================================================================
// Integración con Sprite_Character
//=============================================================================

Sprite_Character.prototype.updateMiniLabel = function() {
    this.setupMiniLabel();
    if (!this._miniLabel) return;
    this.positionMiniLabel();
};

Sprite_Character.prototype.setupMiniLabel = function() {
    if (this._miniLabel) return;
    if (!SceneManager._scene._spriteset) return;
    this._miniLabel = new Window_EventMiniLabel(); // Referencia a la clase
    this._miniLabel.setCharacter(this._character);
    SceneManager._scene._spriteset.addChild(this._miniLabel); // Asegúrate de que esté en la escena
};

//=============================================================================
// Fin del código
//=============================================================================
