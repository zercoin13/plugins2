/*:
 * @plugindesc Sistema de Objetos Únicos con límite real en tiendas <unique> o <unique:x>
 * @author GPT
 *
 * @help
 * ================================
 * NOTETAGS DISPONIBLES
 * ================================
 *
 * <unique>      → Solo puede existir 1 en todo el juego.
 * <unique:3>    → Solo pueden existir 3 en todo el juego.
 *
 * ✔ Funciona en tiendas normales
 * ✔ Funciona con eventos (Cambiar Objetos)
 * ✔ Funciona aunque el jugador venda el objeto
 * ✔ No pierde oro innecesariamente
 * ✔ Bloquea compra real en tienda
 * ✔ Registro global permanente
 *
 * Compatible con RPG Maker MV
 */

(function() {

    // ===============================
    // INICIALIZAR REGISTRO GLOBAL
    // ===============================

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._uniqueItemRegistry = {};
    };

    Game_System.prototype.getUniqueCount = function(itemId) {
        return this._uniqueItemRegistry[itemId] || 0;
    };

    Game_System.prototype.addUniqueItem = function(itemId, amount) {
        if (!this._uniqueItemRegistry[itemId]) {
            this._uniqueItemRegistry[itemId] = 0;
        }
        this._uniqueItemRegistry[itemId] += amount;
    };

    // ===============================
    // DETECTAR NOTETAG
    // ===============================

    function getUniqueLimit(item) {
        if (!item || !item.meta) return null;

        if (item.meta.unique !== undefined) {
            const value = item.meta.unique;

            if (value === true || value === "") return 1;

            const num = Number(value);
            return isNaN(num) ? 1 : num;
        }

        return null;
    }

    // ===============================
    // CONTROLAR GANANCIA DE OBJETOS
    // ===============================

    const _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {

        const limit = getUniqueLimit(item);

        if (limit && amount > 0) {

            const currentTotal = $gameSystem.getUniqueCount(item.id);
            const remaining = limit - currentTotal;

            if (remaining <= 0) {
                return; // Bloqueado completamente
            }

            const finalAmount = Math.min(amount, remaining);

            _Game_Party_gainItem.call(this, item, finalAmount, includeEquip);
            $gameSystem.addUniqueItem(item.id, finalAmount);

        } else {
            _Game_Party_gainItem.call(this, item, amount, includeEquip);
        }
    };

    // ===============================
    // BLOQUEO REAL EN TIENDA (Cantidad Máxima)
    // ===============================

    const _Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
    Scene_Shop.prototype.maxBuy = function() {

        const baseMax = _Scene_Shop_maxBuy.call(this);
        const item = this._item;
        const limit = getUniqueLimit(item);

        if (limit) {
            const currentTotal = $gameSystem.getUniqueCount(item.id);
            const remaining = limit - currentTotal;

            return Math.max(0, Math.min(baseMax, remaining));
        }

        return baseMax;
    };

    // ===============================
    // BLOQUEO FINAL AL CONFIRMAR COMPRA
    // ===============================

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {

        const item = this._item;
        const limit = getUniqueLimit(item);

        if (limit) {
            const currentTotal = $gameSystem.getUniqueCount(item.id);
            const remaining = limit - currentTotal;

            if (remaining <= 0) {
                SoundManager.playBuzzer();
                return; // Bloqueado
            }

            number = Math.min(number, remaining);
        }

        _Scene_Shop_doBuy.call(this, number);

        // Refrescar ventanas
        this._buyWindow.refresh();
        this._numberWindow.refresh();
        this._statusWindow.refresh();
    };

})();