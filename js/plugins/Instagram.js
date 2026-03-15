var Instagram = Instagram || {};

// Función para lanzar la aplicación
Instagram.launch = function() {
    if (!this.window) {
        this.createWindow();
    }
    SceneManager._scene.addChild(this.window);
    this.window.show();
};

// Crear la ventana de Instagram
Instagram.createWindow = function() {
    this.window = new Window_Instagram();
};

// Cerrar Instagram
Instagram.close = function() {
    if (Instagram.window) {
        SceneManager._scene.removeChild(Instagram.window);
        Instagram.window = null;
    }
};

// Ventana de Instagram
function Window_Instagram() {
    this.initialize.apply(this, arguments);
}

Window_Instagram.prototype = Object.create(Window_Base.prototype);
Window_Instagram.prototype.constructor = Window_Instagram;

Window_Instagram.prototype.initialize = function() {
    var width = Graphics.boxWidth - 200;
    var height = Graphics.boxHeight - 200;
    Window_Base.prototype.initialize.call(this, 100, 100, width, height);
    this.opacity = 255;
    this.createProfile();
    this.createButtons();
};

// Crear un perfil con imagen y nombre
Window_Instagram.prototype.createProfile = function() {
    this._profileName = "Usuario Desconocido";
    this._profilePicture = new Sprite(ImageManager.loadPicture("ProfilePlaceholder"));
    this._profilePicture.x = this.width / 2 - 50;
    this._profilePicture.y = 50;
    this.addChild(this._profilePicture);
};

// Crear botones de seguir y salir
Window_Instagram.prototype.createButtons = function() {
    this._followButton = new Sprite(ImageManager.loadPicture("FollowButton"));
    this._exitButton = new Sprite(ImageManager.loadPicture("ExitButton"));
    
    this._followButton.x = this.width / 2 - 50;
    this._followButton.y = this.height - 80;
    this._exitButton.x = this.width - 60;
    this._exitButton.y = 10;
    
    this.addChild(this._followButton);
    this.addChild(this._exitButton);
};

// Verificar interacciones
Window_Instagram.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.checkMouseClick();
};

Window_Instagram.prototype.checkMouseClick = function() {
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        
        // Simular seguir a un usuario
        if (x >= this._followButton.x && x <= this._followButton.x + 100 &&
            y >= this._followButton.y && y <= this._followButton.y + 50) {
            console.log("Ahora sigues a este usuario");
        }
        
        // Salir de Instagram
        if (x >= this._exitButton.x && x <= this._exitButton.x + 50 &&
            y >= this._exitButton.y && y <= this._exitButton.y + 50) {
            Instagram.close();
        }
    }
};
