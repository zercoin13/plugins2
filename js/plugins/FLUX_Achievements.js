/*:
 * @plugindesc v1.4 Sistema de logros tipo Xbox usando switches (Título + Subtítulo, UI responsive)
 * @author FLUX
 *
 * @param Switch Start ID
 * @type number
 * @default 1
 *
 * @param Switch End ID
 * @type number
 * @default 1000
 *
 * @param Duration
 * @type number
 * @default 180
 */

(function() {

const params = PluginManager.parameters('FLUX_Achievements');
const SWITCH_START = Number(params['Switch Start ID']);
const SWITCH_END   = Number(params['Switch End ID']);
const DURATION     = Number(params['Duration']);

let shownAchievements = {};

const _Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    const oldValue = this.value(switchId);
    _Game_Switches_setValue.call(this, switchId, value);

    if (!oldValue && value) {
        if (switchId >= SWITCH_START && switchId <= SWITCH_END && !shownAchievements[switchId]) {
            shownAchievements[switchId] = true;
            const rawName = $dataSystem.switches[switchId];
            if (SceneManager._scene && SceneManager._scene.showAchievement) {
                SceneManager._scene.showAchievement(rawName);
            }
        }
    }
};

function Sprite_Achievement() {
    this.initialize.apply(this, arguments);
}

Sprite_Achievement.prototype = Object.create(Sprite.prototype);
Sprite_Achievement.prototype.constructor = Sprite_Achievement;

Sprite_Achievement.prototype.initialize = function(rawText) {
    Sprite.prototype.initialize.call(this);

    const w = 420;
    const h = 90;
    this._boxWidth = w;

    this.bitmap = new Bitmap(w, h);
    const ctx = this.bitmap.context;

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#1a1a1a");
    grad.addColorStop(1, "#2e2e2e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#6cf0ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, w, h);

    let title = rawText;
    let subtitle = "";
    if (rawText.indexOf(":") !== -1) {
        const parts = rawText.split(":");
        title = parts[0].trim();
        subtitle = parts.slice(1).join(":").trim();
    }

    this.bitmap.fontSize = 32;
    this.bitmap.textColor = "#6cf0ff";
    this.bitmap.drawText("★", 10, 22, 40, 40, "center");

    this.bitmap.fontSize = 14;
    this.bitmap.textColor = "#aaaaaa";
    this.bitmap.drawText("LOGRO DESBLOQUEADO", 50, 4, w - 60, 20, "left");

    let fontSize = 22;
    this.bitmap.fontSize = fontSize;
    while (this.bitmap.measureTextWidth(title) > (w - 70) && fontSize > 14) {
        fontSize--;
        this.bitmap.fontSize = fontSize;
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

    const margin = 20;
    const targetX = Graphics.width - this._boxWidth - margin;

    if (this._time < 30) {
        this.x = Math.max(this.x - 20, targetX);
        this.opacity += 12;
    }
    else if (this._time > DURATION) {
        this.x += 20;
        this.opacity -= 12;
        if (this.opacity <= 0 && this.parent) {
            this.parent.removeChild(this);
        }
    }
};

Sprite_Achievement.prototype.onAdded = function() {
    this.x = Graphics.width;
    this.y = 20;
};

const _Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    _Scene_Base_update.call(this);

    if (this._achievementQueue && this._achievementQueue.length > 0 && !this._achievementActive) {
        this._achievementActive = true;
        const text = this._achievementQueue.shift();
        const sprite = new Sprite_Achievement(text);
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
