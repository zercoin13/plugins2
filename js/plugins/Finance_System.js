/*:
 * @plugindesc Sistema Financiero v9.2 (Ciclos reales corregidos)
 */

var Imported = Imported || {};
Imported.Finance_System = true;

var Finance = Finance || {};

(function() {

// ================================
// CONFIG
// ================================

Finance.debitVarId = 2001;

// ================================
// CORE
// ================================

function Game_Finance() {
    this.initialize.apply(this, arguments);
}

Game_Finance.prototype.initialize = function() {
    this.debts = [];
    this._lastDateKey = null;
};

// ================================
// DINERO
// ================================

Game_Finance.prototype.debit = function() {
    return $gameVariables.value(Finance.debitVarId);
};

Game_Finance.prototype.setDebit = function(v) {
    $gameVariables.setValue(Finance.debitVarId, Math.max(0, v));
};

Game_Finance.prototype.addDebit = function(a) {
    this.setDebit(this.debit() + a);
};

// ================================
// CREAR DEUDA
// ================================

Game_Finance.prototype.addDebt = function(config) {

    this.debts.push({
        name: config.name,
        amountBase: config.amount,
        amountDue: config.amount,
        periodDays: config.periodDays,
        remainingDays: config.periodDays,
        renewable: config.renewable || false,
        cancelIfUnpaid: config.cancelIfUnpaid || false,
        switchOnExpire: config.switchOnExpire || null
    });

    $gameMessage.add("Nueva deuda: " + config.name);
};

// ================================
// PAGO MANUAL
// ================================

Game_Finance.prototype.payDebt = function(index) {

    var d = this.debts[index];
    if (!d) return;

    if (this.debit() <= 0) {
        $gameMessage.add("Fondos insuficientes.");
        return;
    }

    var payment = Math.min(this.debit(), d.amountDue);

    this.addDebit(-payment);
    d.amountDue -= payment;

    $gameMessage.add("Pagaste $" + payment + " a " + d.name);

    if (d.amountDue <= 0) {

        d.amountDue = 0;

        if (!d.renewable) {
            this.debts.splice(index, 1);
        } else {
            d.remainingDays = d.periodDays;
        }
    }
};

// ================================
// PROCESO POR DÍA (CICLO REAL)
// ================================

Game_Finance.prototype.processSingleDay = function() {

    for (var i = this.debts.length - 1; i >= 0; i--) {

        var d = this.debts[i];

        d.remainingDays--;

        if (d.remainingDays <= 0) {

            // Sumar SOLO al completar ciclo
            d.amountDue += d.amountBase;

            if (d.switchOnExpire) {
                $gameSwitches.setValue(d.switchOnExpire, true);
            }

            $gameMessage.add("Venció: " + d.name + " (+$" + d.amountBase + ")");

            // Cobro automático parcial
            if (d.amountDue > 0 && this.debit() > 0) {

                var payment = Math.min(this.debit(), d.amountDue);

                this.addDebit(-payment);
                d.amountDue -= payment;

                $gameMessage.add("Cobro automático: " + d.name + " (-$" + payment + ")");
            }

            if (d.amountDue <= 0) {

                if (!d.renewable) {
                    this.debts.splice(i, 1);
                    continue;
                } else {
                    d.remainingDays = d.periodDays;
                }

            } else {

                if (d.cancelIfUnpaid) {
                    this.debts.splice(i, 1);
                    continue;
                }

                d.remainingDays = d.periodDays;
            }
        }
    }
};

// ================================
// SAVE SUPPORT
// ================================

var _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    $gameFinance = new Game_Finance();
};

var _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.finance = $gameFinance;
    return contents;
};

var _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.call(this, contents);
    $gameFinance = contents.finance || new Game_Finance();
};

// ================================
// UI
// ================================

function Scene_Finance() {
    this.initialize.apply(this, arguments);
}

Scene_Finance.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Finance.prototype.constructor = Scene_Finance;

Scene_Finance.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._window = new Window_Finance(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._window.setHandler('cancel', this.popScene.bind(this));
    this._window.setHandler('ok', this.paySelected.bind(this));
    this.addWindow(this._window);
};

Scene_Finance.prototype.paySelected = function() {
    var index = this._window.index();
    $gameFinance.payDebt(index);
    this._window.refresh();
    this._window.activate();
};

function Window_Finance() {
    this.initialize.apply(this, arguments);
}

Window_Finance.prototype = Object.create(Window_Selectable.prototype);
Window_Finance.prototype.constructor = Window_Finance;

Window_Finance.prototype.initialize = function(x, y, w, h) {
    Window_Selectable.prototype.initialize.call(this, x, y, w, h);
    this.refresh();
    this.activate();
};

Window_Finance.prototype.maxItems = function() {
    return $gameFinance.debts.length;
};

Window_Finance.prototype.refresh = function() {

    this.contents.clear();

    this.drawText("=== SISTEMA FINANCIERO ===", 0, 0, this.contents.width, 'center');
    this.drawText("Débito: $" + $gameFinance.debit(), 0, 40);

    var col1 = 20;
    var col2 = this.contents.width * 0.5;
    var col3 = this.contents.width * 0.8;

    for (var i = 0; i < $gameFinance.debts.length; i++) {

        var d = $gameFinance.debts[i];
        var y = 100 + i * 40;

        this.drawText(d.name, col1, y, col2 - col1);
        this.drawText("$" + d.amountDue, col2, y, col3 - col2, 'right');
        this.drawText("Días: " + d.remainingDays, col3, y, this.contents.width - col3, 'right');
    }
};

// ================================
// DETECTOR REAL DE CAMBIO DE DÍA
// ================================

Input.keyMapper[76] = 'finance';

var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    if (Input.isTriggered('finance')) {
        SceneManager.push(Scene_Finance);
    }

    this.updateFinanceDayCheck();
};

Scene_Map.prototype.updateFinanceDayCheck = function() {

    if (!$gameTime) return;

    var currentKey = $gameTime.year + "_" + $gameTime.month + "_" + $gameTime.day;

    if ($gameFinance._lastDateKey === null) {
        $gameFinance._lastDateKey = currentKey;
        return;
    }

    if ($gameFinance._lastDateKey !== currentKey) {

        $gameFinance.processSingleDay();

        $gameFinance._lastDateKey = currentKey;
    }
};

})();
