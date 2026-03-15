/* =====================================
   SISTEMA DE COMPUTADORA - PANTALLA PRINCIPAL
   ===================================== */

var RPG_Computer = RPG_Computer || {};

// Lista de aplicaciones (se llamarán desde plugins externos)
RPG_Computer._apps = [
    { name: "Google", icon: "GoogleIcon", plugin: "Google" },
    { name: "Tinder", icon: "TinderIcon", plugin: "Tinder" },
    { name: "Instagram", icon: "InstagramIcon", plugin: "Instagram" },
    { name: "OnlyFans", icon: "OnlyFansIcon", plugin: "OnlyFans" },
    { name: "YouTube", icon: "YouTubeIcon", plugin: "YouTube" }
];

// Mostrar la computadora
RPG_Computer.show = function() {
    if (!this.window) {
        this.createWindow();
    }
    SceneManager._scene.addChild(this.window);
    this.window.show();
    this.freezePlayer();
};

// Crear la ventana de la computadora
RPG_Computer.createWindow = function() {
    this.window = new Window_Computer();
};

// Llamar a una aplicación desde su propio plugin
RPG_Computer.openApp = function(pluginName) {
    if (window[pluginName] && typeof window[pluginName].launch === "function") {
        window[pluginName].launch();
    } else {
        console.warn("El plugin " + pluginName + " no está definido o no tiene función 'launch'.");
    }
};

// Cerrar la computadora
RPG_Computer.close = function() {
    if (RPG_Computer.window) {
        SceneManager._scene.removeChild(RPG_Computer.window);
        RPG_Computer.window = null;
    }
    RPG_Computer.unfreezePlayer();
};

// Congelar al jugador mientras usa la computadora
RPG_Computer.freezePlayer = function() {
    $gamePlayer._originalMoveRoute = JsonEx.makeDeepCopy($gamePlayer._moveRoute);
    $gamePlayer._originalMoveRouteForcing = $gamePlayer._moveRouteForcing;
    $gamePlayer._originalThrough = $gamePlayer.isThrough();
    $gamePlayer.setMoveRoute({ list: [{ code: 0 }], repeat: false, skippable: false, wait: false });
    $gamePlayer.setThrough(true);
};

// Descongelar al jugador tras cerrar la computadora
RPG_Computer.unfreezePlayer = function() {
    if ($gamePlayer._originalMoveRoute) {
        $gamePlayer.setMoveRoute($gamePlayer._originalMoveRoute);
        $gamePlayer._moveRouteForcing = $gamePlayer._originalMoveRouteForcing;
    }
    $gamePlayer.setThrough($gamePlayer._originalThrough);
};

/* ==========================
       VENTANA DE PC
============================= */

function Window_Computer() {
    this.initialize.apply(this, arguments);
}

Window_Computer.prototype = Object.create(Window_Base.prototype);
Window_Computer.prototype.constructor = Window_Computer;

Window_Computer.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.createBackground();
    this.createIcons();
    this.createExitButton();
};

// Fondo de la computadora
Window_Computer.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite(ImageManager.loadPicture("ComputerBackground"));
    this.addChild(this._backgroundSprite);
};

// Crear los íconos de las aplicaciones
Window_Computer.prototype.createIcons = function() {
    this._icons = [];
    var apps = RPG_Computer._apps;
    for (var i = 0; i < apps.length; i++) {
        let app = apps[i];

        let icon = new Sprite(ImageManager.loadPicture(app.icon));
        icon.x = 100 + (i % 4) * 150;
        icon.y = 100 + Math.floor(i / 4) * 150;
        icon._pluginName = app.plugin;
        icon.scale.x = 144 / icon.bitmap.width;
        icon.scale.y = 144 / icon.bitmap.height;
        this._icons.push(icon);
        this.addChild(icon);
    }
};

// Crear botón de salida
Window_Computer.prototype.createExitButton = function() {
    this._exitButton = new Sprite(ImageManager.loadPicture("ExitButton"));
    this._exitButton.x = Graphics.boxWidth - 120;
    this._exitButton.y = Graphics.boxHeight - 80;
    this.addChild(this._exitButton);
};

// Verificar clics en aplicaciones o botón de salida
Window_Computer.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.checkMouseClick();
};

Window_Computer.prototype.checkMouseClick = function() {
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        
        // Clic en íconos de apps
        for (var icon of this._icons) {
            if (x >= icon.x && x <= icon.x + 144 && y >= icon.y && y <= icon.y + 144) {
                if (icon._pluginName) {
                    RPG_Computer.openApp(icon._pluginName);
                }
                return;
            }
        }

        // Clic en botón de salida
        if (x >= this._exitButton.x && x <= this._exitButton.x + 100 &&
            y >= this._exitButton.y && y <= this._exitButton.y + 50) {
            RPG_Computer.close();
        }
    }
};
