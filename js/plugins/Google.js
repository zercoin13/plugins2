var Google = Google || {};

// Función para lanzar la aplicación
Google.launch = function() {
    if (!this.window) {
        this.createWindow();
    }
    SceneManager._scene.addChild(this.window);
    this.window.show();
};

// Crear la ventana de Google
Google.createWindow = function() {
    this.window = new Window_Google();
};

// Cerrar Google
Google.close = function() {
    if (Google.window) {
        SceneManager._scene.removeChild(Google.window);
        Google.window = null;
    }
};

// Ventana de Google
function Window_Google() {
    this.initialize.apply(this, arguments);
}

Window_Google.prototype = Object.create(Window_Base.prototype);
Window_Google.prototype.constructor = Window_Google;

Window_Google.prototype.initialize = function() {
    var width = Graphics.boxWidth - 200;
    var height = Graphics.boxHeight - 200;
    Window_Base.prototype.initialize.call(this, 100, 100, width, height);
    this.opacity = 255;
    this.createSearchBar();
    this.createExitButton();
};

// Crear la barra de búsqueda
Window_Google.prototype.createSearchBar = function() {
    this._searchInput = new Window_InputField(this.x + 50, this.y + 50, 300, 40);
    this.addChild(this._searchInput);
};

// Crear botón de salir
Window_Google.prototype.createExitButton = function() {
    this._exitButton = new Sprite(ImageManager.loadPicture("ExitButton"));
    this._exitButton.x = this.width - 60;
    this._exitButton.y = 10;
    this.addChild(this._exitButton);
};

// Verificar clics en el botón de salida
Window_Google.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        if (x >= this._exitButton.x && x <= this._exitButton.x + 50 &&
            y >= this._exitButton.y && y <= this._exitButton.y + 30) {
            Google.close();
        }
    }
};

// Campo de entrada para la búsqueda
function Window_InputField(x, y, width, height) {
    this.initialize.apply(this, arguments);
}

Window_InputField.prototype = Object.create(Window_Base.prototype);
Window_InputField.prototype.constructor = Window_InputField;

Window_InputField.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 255;
    this._text = "";
};

Window_InputField.prototype.processHandling = function() {
    if (Input.isTriggered("ok")) {
        this.performSearch();
    }
};

Window_InputField.prototype.performSearch = function() {
    var result = "Resultados de búsqueda para: " + this._text;
    console.log(result);
};
