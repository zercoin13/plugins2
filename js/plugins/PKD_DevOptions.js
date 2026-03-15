/*:
 * @target MZ
 * @plugindesc Muestra los nombres de todos los eventos sobre sus sprites controlados por un interruptor (ID 250).
 * @author TuNombre
 *
 * @param SwitchID
 * @text Interruptor para mostrar nombres
 * @desc ID del interruptor que controla la visibilidad de los nombres de los eventos.
 * @default 250
 *
 * @help
 * Este plugin muestra los nombres de todos los eventos sobre sus sprites, controlado por un interruptor.
 * 
 * Instrucciones:
 * 1. Crea un interruptor (por ejemplo, ID 250) que se active/desactive según quieras mostrar los nombres de los eventos.
 * 2. Los nombres de todos los eventos se mostrarán cuando el interruptor esté activado (ON).
 * 3. Los nombres de los eventos se ocultarán cuando el interruptor esté desactivado (OFF).
 */

(() => {
    // Configuración de parámetros del plugin
    const parameters = PluginManager.parameters('ShowEventNames');
    const switchID = Number(parameters['SwitchID'] || 250);  // Por defecto, el interruptor es 250

    // Función para actualizar los eventos y mostrar u ocultar los nombres
    const _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);

        // Si el interruptor está activado, mostrar los nombres de los eventos
        if ($gameSwitches.value(switchID)) {
            this.showAllEventNames();
        } else {
            this.hideAllEventNames();
        }
    };

    // Mostrar los nombres de todos los eventos
    Scene_Map.prototype.showAllEventNames = function() {
        $gameMap.events().forEach(event => {
            if (!event._nameSprite) {  // Si aún no se ha creado el sprite del nombre
                event.showName();
            }
        });
    };

    // Ocultar los nombres de todos los eventos
    Scene_Map.prototype.hideAllEventNames = function() {
        $gameMap.events().forEach(event => {
            if (event._nameSprite) {  // Si ya existe el sprite del nombre
                event.hideName();
            }
        });
    };

    // Redefinir método para mostrar el nombre
    Game_Event.prototype.showName = function() {
        if (!this._nameSprite) {
            this._nameSprite = new Sprite(new Bitmap(200, 36));  // Tamaño del cuadro de texto
            this._nameSprite.bitmap.fontSize = 18;  // Tamaño de la fuente
            this._nameSprite.bitmap.outlineWidth = 3;  // Grosor del contorno del texto
            this._nameSprite.bitmap.outlineColor = 'black';  // Color del contorno del texto
            SceneManager._scene._spriteset.addChild(this._nameSprite);
        }
        this.updateNamePosition();  // Actualizar la posición del nombre
    };

    // Redefinir método para ocultar el nombre
    Game_Event.prototype.hideName = function() {
        if (this._nameSprite) {
            SceneManager._scene._spriteset.removeChild(this._nameSprite);
            this._nameSprite = null;
        }
    };

    // Actualiza la posición del nombre según la posición del evento
    Game_Event.prototype.updateNamePosition = function() {
        if (this._nameSprite) {
            // La posición X está centrada sobre el sprite del evento
            this._nameSprite.x = this.screenX() - this._nameSprite.bitmap.width / 2;

            // La posición Y está ajustada al 10% sobre la altura del sprite del evento
            const spriteHeight = 96; // Altura fija de 96px (ajustado a tu sprite)
            const offsetY = spriteHeight * 0.10;  // 10% sobre el sprite

            // La posición Y depende de la posición del evento en la pantalla
            this._nameSprite.y = this.screenY() - spriteHeight - offsetY;

            this._nameSprite.bitmap.clear();
            this._nameSprite.bitmap.drawText(this.event().name, 0, 0, 200, 36, 'center');  // Dibujar el nombre
        }
    };

})();
