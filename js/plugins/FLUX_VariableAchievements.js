/*:
 * @plugindesc v1.5 Logros por variables con detección de umbral (RANGO 2001–3001)
 * @author FLUX
 *
 * @param Achievements
 * @type note
 * @default ""
 *
 * @param Duration
 * @type number
 * @default 180
 */

(function() {

var params = PluginManager.parameters('FLUX_VariableAchievements');
var rawData = params['Achievements'] || "";
var DURATION = Number(params['Duration']);

// 🔒 RANGO PERMITIDO
var MIN_VAR_ID = 2001;
var MAX_VAR_ID = 3001;

var achievementData = [];
var unlocked = {};

//────────────────────────────
// PARSEAR TEXTO
//────────────────────────────
function parseAchievements(text) {
    try { text = JSON.parse(text); } catch (e) {}
    if (typeof text !== "string") return [];
    return text.split(/\r?\n/).map(function(l){ return l.trim(); }).filter(Boolean);
}

var lines = parseAchievements(rawData);

lines.forEach(function(entry) {
    var parts = entry.split(",");
    if (parts.length >= 3) {
        var varId = Number(parts[0]);

        // ⛔ Ignorar logros fuera del rango
        if (varId < MIN_VAR_ID || varId > MAX_VAR_ID) return;

        achievementData.push({
            varId: varId,
            value: Number(parts[1]),
            text: parts.slice(2).join(",")
        });
    }
});

//────────────────────────────
// DETECCIÓN DE UMBRAL
//────────────────────────────
var _Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {

    // ⛔ Si la variable no está en rango, no hacer nada extra
    if (variableId < MIN_VAR_ID || variableId > MAX_VAR_ID) {
        _Game_Variables_setValue.call(this, variableId, value);
        return;
    }

    var oldValue = this.value(variableId) || 0;
    _Game_Variables_setValue.call(this, variableId, value);
    var newValue = this.value(variableId) || 0;

    checkVariableAchievements(variableId, oldValue, newValue);
};

function checkVariableAchievements(varId, oldVal, newVal) {
    achievementData.forEach(function(a) {
        var key = a.varId + "_" + a.value;
        if (a.varId === varId &&
            oldVal < a.value &&
            newVal >= a.value &&
            !unlocked[key]) {

            unlocked[key] = true;

            if (SceneManager._scene &&
                SceneManager._scene.showAchievement) {
                SceneManager._scene.showAchievement(a.text);
            }
        }
    });
}

//────────────────────────────
// SPRITE
//────────────────────────────
function Sprite_Achievement() { this.initialize.apply(this, arguments); }
Sprite_Achievement.prototype = Object.create(Sprite.prototype);
Sprite_Achievement.prototype.constructor = Sprite_Achievement;

Sprite_Achievement.prototype.initialize = function(rawText) {
    Sprite.prototype.initialize.call(this);

    var w = 420, h = 90;
    this._boxWidth = w;
    this.bitmap = new Bitmap(w, h);
    var ctx = this.bitmap.context;

    var grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#1a1a1a");
    grad.addColorStop(1, "#2e2e2e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#6cf0ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, w, h);

    var title = rawText, subtitle = "";
    if (rawText.indexOf(":") !== -1) {
        var p = rawText.split(":");
        title = p[0].trim();
        subtitle = p.slice(1).join(":").trim();
    }

    this.bitmap.fontSize = 32;
    this.bitmap.textColor = "#6cf0ff";
    this.bitmap.drawText("★", 10, 22, 40, 40, "center");

    this.bitmap.fontSize = 14;
    this.bitmap.textColor = "#aaaaaa";
    this.bitmap.drawText("LOGRO DESBLOQUEADO", 50, 4, w - 60, 20, "left");

    var fs = 22;
    this.bitmap.fontSize = fs;
    while (this.bitmap.measureTextWidth(title) > (w - 70) && fs > 14) {
        fs--; this.bitmap.fontSize = fs;
    }

    this.bitmap.textColor = "#ffffff";
    this.bitmap.drawText(title, 50, 26, w - 60, 28, "left");

    if (subtitle) {
        this.bitmap.fontSize = 16;
        this.bitmap.textColor = "#cccccc";
        this.bitmap.drawText(subtitle, 50, 54, w - 60, 24, "left");
    }

    this._time = 0;
    this.opacity = 0;
};

Sprite_Achievement.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._time++;

    var margin = 20;
    var targetX = Graphics.width - this._boxWidth - margin;

    if (this._time < 30) {
        this.x = Math.max(this.x - 20, targetX);
        this.opacity += 12;
    }
    else if (this._time > DURATION) {
        this.x += 20;
        this.opacity -= 12;
        if (this.opacity <= 0 && this.parent) this.parent.removeChild(this);
    }
};

Sprite_Achievement.prototype.onAdded = function() {
    this.x = Graphics.width;
    this.y = 20;
};

//────────────────────────────
// COLA
//────────────────────────────
var _Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    _Scene_Base_update.call(this);

    if (this._achievementQueue && this._achievementQueue.length > 0 && !this._achievementActive) {
        this._achievementActive = true;
        var sprite = new Sprite_Achievement(this._achievementQueue.shift());
        this.addChild(sprite);
        sprite.onAdded();
        this._achievementSprite = sprite;
    }

    if (this._achievementSprite && !this._achievementSprite.parent) {
        this._achievementActive = false;
        this._achievementSprite = null;
    }
};

Scene_Base.prototype.showAchievement = function(text) {
    this._achievementQueue = this._achievementQueue || [];
    this._achievementQueue.push(text);
};

})();
