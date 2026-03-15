/*:
 * @plugindesc Escenas mejoradas para la computadora en RPG Maker MV.
 * @author TuNombre
 *
 * @help
 * Este plugin añade escenas interactivas con botones y funcionalidades
 * similares a las aplicaciones originales. Todas incluyen un botón
 * de retroceso para volver a la computadora.
 */

function Scene_Computer() {
    this.initialize.apply(this, arguments);
}

Scene_Computer.prototype = Object.create(Scene_Base.prototype);
Scene_Computer.prototype.constructor = Scene_Computer;

Scene_Computer.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Computer.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createIcons();
};

Scene_Computer.prototype.createBackground = function() {
    this._background = new Sprite(ImageManager.loadPicture("ComputerBackground"));
    this.addChild(this._background);
};

Scene_Computer.prototype.createIcons = function() {
    this._icons = [];
    var apps = RPG_Computer._apps;
    for (var i = 0; i < apps.length; i++) {
        let app = apps[i];
        let icon = new Sprite(ImageManager.loadPicture(app.icon));
        icon.x = 100 + (i % 4) * 150;
        icon.y = 100 + Math.floor(i / 4) * 150;
        icon._appAction = app.action;
        this._icons.push(icon);
        this.addChild(icon);
    }
};

Scene_Computer.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
};

function createCustomScene(sceneName, backgroundImage, setupFunction) {
    window[sceneName] = function() { this.initialize.apply(this, arguments); };
    window[sceneName].prototype = Object.create(Scene_Base.prototype);
    window[sceneName].prototype.constructor = window[sceneName];

    window[sceneName].prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    window[sceneName].prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground(backgroundImage);
        this.createBackButton();
        if (setupFunction) setupFunction.call(this);
    };

    window[sceneName].prototype.createBackground = function(image) {
        this._background = new Sprite(ImageManager.loadPicture(image));
        this.addChild(this._background);
    };

    window[sceneName].prototype.createBackButton = function() {
        this._backButton = new Sprite(ImageManager.loadPicture("BackButton"));
        this._backButton.x = 50;
        this._backButton.y = 50;
        this.addChild(this._backButton);
    };

    window[sceneName].prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this.checkBackButtonClick();
    };

    window[sceneName].prototype.checkBackButtonClick = function() {
        if (TouchInput.isTriggered()) {
            var x = TouchInput.x;
            var y = TouchInput.y;
            if (x >= this._backButton.x && x <= this._backButton.x + 100 && 
                y >= this._backButton.y && y <= this._backButton.y + 50) {
                SceneManager.push(Scene_Computer);
            }
        }
    };
}

// Configurar Google con barra de búsqueda
createCustomScene("Scene_Google", "GoogleBackground", function() {
    this._searchBar = new Window_Base(100, 200, 600, 80);
    this._searchBar.drawText("Buscar en Google...", 10, 10, 580, "left");
    this.addChild(this._searchBar);
});

// Configurar Instagram con feed de imágenes
createCustomScene("Scene_Instagram", "InstagramBackground", function() {
    this._feed = new Sprite(ImageManager.loadPicture("InstagramFeed"));
    this._feed.x = 300;
    this._feed.y = 200;
    this.addChild(this._feed);
});

// Configurar Tinder con deslizamiento de personajes
createCustomScene("Scene_Tinder", "TinderBackground", function() {
    this._profile = new Sprite(ImageManager.loadPicture("TinderProfile"));
    this._profile.x = 600;
    this._profile.y = 300;
    this.addChild(this._profile);
});

// Configurar OnlyFans con sistema de compra
createCustomScene("Scene_OnlyFans", "OnlyFansBackground", function() {
    this._lockedContent = new Sprite(ImageManager.loadPicture("LockedContent"));
    this._lockedContent.x = 500;
    this._lockedContent.y = 400;
    this.addChild(this._lockedContent);
});
