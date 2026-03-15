/*:
 * @plugindesc Muestra la cantidad de dinero del jugador en la pantalla.
 * @author TuNombre
 *
 * @help
 * Este plugin muestra el dinero del jugador en la parte superior izquierda de la pantalla.
 */

(function() {
    // Método para dibujar el dinero en la pantalla
    var _Scene_Map_drawMap = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_drawMap.call(this); // Llamar a la función original
        this.createMoneyText(); // Crear el texto del dinero
    };

    // Crear el sprite de texto para mostrar el dinero
    Scene_Map.prototype.createMoneyText = function() {
        this._moneyText = new Sprite(new Bitmap(350, 400));
        this.addChild(this._moneyText); // Añadir el texto al mapa
    };

    // Actualizar el texto del dinero
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this); // Llamar a la función original
        this.updateMoneyText(); // Actualizar el dinero en pantalla
    };

    // Actualiza el texto con el valor del dinero
    Scene_Map.prototype.updateMoneyText = function() {
        var bitmap = this._moneyText.bitmap;
        bitmap.clear(); // Limpiar el bitmap antes de dibujar nuevo texto
        bitmap.fontSize = 24; // Tamaño de la fuente
        bitmap.textColor = '#ffffff'; // Color del texto (blanco)
        bitmap.drawText('Dinero: ' + $gameParty.gold(), 10, 5, 350, 400); // Dibuja el texto
    };
})();
