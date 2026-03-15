/*:
 * @plugindesc Sistema bancario completo con reemplazo total del oro del juego
 * @author Tú
 *
 * @help
 * ================================
 * VARIABLES USADAS
 * ================================
 * 2000 → Efectivo
 * 2001 → Banco
 *
 * ================================
 * SWITCHES
 * ================================
 * 981 → Mostrar HUD de dinero
 *
 * ================================
 * USO RÁPIDO (SCRIPT)
 * ================================
 * Banking.cash()
 * Banking.bank()
 *
 * Banking.addCash(100)
 * Banking.addBank(500)
 *
 * Banking.withdraw(200) // banco → efectivo
 * Banking.deposit(150)  // efectivo → banco
 */

(() => {

  const Banking = {};
  window.Banking = Banking;

  Banking.VAR_CASH = 2000;
  Banking.VAR_BANK = 2001;
  Banking.SHOW_HUD_SWITCH = 981;

  Banking._get = function(variableId) {
    return $gameVariables.value(variableId) || 0;
  };

  Banking._set = function(variableId, value) {
    $gameVariables.setValue(variableId, Math.max(0, value));
  };

  Banking.cash = function() {
    return this._get(this.VAR_CASH);
  };

  Banking.bank = function() {
    return this._get(this.VAR_BANK);
  };

  Banking.addCash = function(value) {
    this._set(this.VAR_CASH, this.cash() + value);
  };

  Banking.addBank = function(value) {
    this._set(this.VAR_BANK, this.bank() + value);
  };

  Banking.withdraw = function(amount) {
    if (amount <= 0) return false;
    if (this.bank() < amount) return false;

    this._set(this.VAR_BANK, this.bank() - amount);
    this._set(this.VAR_CASH, this.cash() + amount);
    return true;
  };

  Banking.deposit = function(amount) {
    if (amount <= 0) return false;
    if (this.cash() < amount) return false;

    this._set(this.VAR_CASH, this.cash() - amount);
    this._set(this.VAR_BANK, this.bank() + amount);
    return true;
  };

  Game_Party.prototype.gold = function() {
      return Banking.cash();
  };

  Game_Party.prototype.gainGold = function(amount) {
      Banking.addCash(amount);
  };

  Game_Party.prototype.loseGold = function(amount) {
      Banking.addCash(-amount);
  };

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
      _Game_Party_initialize.call(this);
      this._gold = 0;
  };

  function Window_BankingHUD() {
    this.initialize(...arguments);
  }

  Window_BankingHUD.prototype = Object.create(Window_Base.prototype);
  Window_BankingHUD.prototype.constructor = Window_BankingHUD;

  Window_BankingHUD.prototype.initialize = function() {
    const width = 260;
    const height = this.fittingHeight(2);

    const x = 0;
    const y = Math.floor(Graphics.boxHeight * 0.25);

    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.padding = 8;
    this.refresh();
  };

  Window_BankingHUD.prototype.refresh = function() {
    this.contents.clear();
    this.drawText("💵  $" + Banking.cash(), 0, 0, this.contents.width, "left");
    this.drawText("🏦  $" + Banking.bank(), 0, this.lineHeight(), this.contents.width, "left");
  };

  Window_BankingHUD.prototype.update = function() {
    Window_Base.prototype.update.call(this);

    if ($gameSwitches.value(Banking.SHOW_HUD_SWITCH)) {
      this.visible = true;
      this.refresh();
    } else {
      this.visible = false;
    }
  };

  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this._bankingHUD = new Window_BankingHUD();
    this.addWindow(this._bankingHUD);
  };

})();