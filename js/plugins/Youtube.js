var YouTube = YouTube || {};

// Función para lanzar la aplicación
YouTube.launch = function() {
    if (!this.window) {
        this.createWindow();
    }
    SceneManager._scene.addChild(this.window);
    this.window.show();
};

// Crear la ventana de YouTube
YouTube.createWindow = function() {
    this.window = new Window_YouTube();
};

// Cerrar YouTube
YouTube.close = function() {
    if (YouTube.window) {
        SceneManager._scene.removeChild(YouTube.window);
        YouTube.window = null;
    }
};

// Ventana de YouTube
function Window_YouTube() {
    this.initialize.apply(this, arguments);
}

Window_YouTube.prototype = Object.create(Window_Base.prototype);
Window_YouTube.prototype.constructor = Window_YouTube;

Window_YouTube.prototype.initialize = function() {
    var width = Graphics.boxWidth - 200;
    var height = Graphics.boxHeight - 200;
    Window_Base.prototype.initialize.call(this, 100, 100, width, height);
    this.opacity = 255;
    this.createVideoPlayer();
    this.createButtons();
};

// Crear el reproductor de video (imagen simulada)
Window_YouTube.prototype.createVideoPlayer = function() {
    this._videoThumbnail = new Sprite(ImageManager.loadPicture("VideoPlaceholder"));
    this._videoThumbnail.x = this.width / 2 - 100;
    this._videoThumbnail.y = 50;
    this.addChild(this._videoThumbnail);
};

// Crear botones de reproducción y salida
Window_YouTube.prototype.createButtons = function() {
    this._playButton = new Sprite(ImageManager.loadPicture("PlayButton"));
    this._exitButton = new Sprite(ImageManager.loadPicture("ExitButton"));
    
    this._playButton.x = this.width / 2 - 25;
    this._playButton.y = this.height - 80;
    this._exitButton.x = this.width - 60;
    this._exitButton.y = 10;
    
    this.addChild(this._playButton);
    this.addChild(this._exitButton);
};

// Verificar interacciones
Window_YouTube.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.checkMouseClick();
};

Window_YouTube.prototype.checkMouseClick = function() {
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        
        // Simular reproducción de video
        if (x >= this._playButton.x && x <= this._playButton.x + 50 &&
            y >= this._playButton.y && y <= this._playButton.y + 50) {
            console.log("Reproduciendo video...");
        }
        
        // Salir de YouTube
        if (x >= this._exitButton.x && x <= this._exitButton.x + 50 &&
            y >= this._exitButton.y && y <= this._exitButton.y + 50) {
            YouTube.close();
        }
    }
};
