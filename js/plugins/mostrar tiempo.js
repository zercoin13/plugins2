(function() {
    // Crea una ventana personalizada
    function TimeIndicatorWindow() {
        this.initialize.apply(this, arguments);
    }

    TimeIndicatorWindow.prototype = Object.create(Window_Base.prototype);
    TimeIndicatorWindow.prototype.constructor = TimeIndicatorWindow;

    TimeIndicatorWindow.prototype.initialize = function() {
        const width = 200;
        const height = this.fittingHeight(1);
        const x = (Graphics.boxWidth - width) / 2; // Centrar en pantalla
        const y = 10; // Margen superior
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    TimeIndicatorWindow.prototype.refresh = function() {
        this.contents.clear();
        let timeText = "";
        if ($gameSwitches.value(141)) {
            timeText = "Morning";
        } else if ($gameSwitches.value(142)) {
            timeText = "Day";
        } else if ($gameSwitches.value(143)) {
            timeText = "Evening";
        } else if ($gameSwitches.value(144)) {
            timeText = "Night";
        }
        this.drawText(timeText, 0, 0, this.contents.width, 'center');
    };

    // Agregar la ventana al Scene_Map
    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._timeIndicatorWindow = new TimeIndicatorWindow();
        this.addWindow(this._timeIndicatorWindow);
    };

    // Actualizar la ventana en cada frame
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (this._timeIndicatorWindow) {
            this._timeIndicatorWindow.refresh();
        }
    };
})();
