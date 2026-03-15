var OnlyFans = OnlyFans || {};

// Datos de los perfiles (Se pueden ampliar o modificar)
OnlyFans.profiles = [
    { name: "Angela", image: "Model1", price: 500 },
    { name: "MilfAnonima", image: "Model2", price: 750 },
    { name: "MissViolet", image: "Model3", price: 1000 }
];

OnlyFans.currentIndex = 0; // Perfil actual

// Función para abrir OnlyFans desde cualquier parte
OnlyFans.open = function() {
    SceneManager.push(Scene_OnlyFans);
};

// Agregar la app al teléfono cuando se abra
OnlyFans.ensureAppExists = function() {
    if (typeof Phone !== 'undefined' && Phone.AddApp) {
        if (!Phone.IsAppExists("onlyFansApp")) {
            Phone.AddApp("onlyFansApp");
            console.log("OnlyFans App añadida al teléfono.");
        }
    } else {
        console.warn("Phone menu no está listo, reintentando...");
        setTimeout(OnlyFans.ensureAppExists, 1000); // Reintentar hasta que esté disponible
    }
};

// Registrar la app cada vez que se abre el teléfono
var _Phone_Show_OnlyFans = Phone.Show;
Phone.Show = function() {
    OnlyFans.ensureAppExists();
    _Phone_Show_OnlyFans.call(this);
};

// Lanzar la app desde el teléfono
Phone.OpenApp = function(appId) {
    if (appId === "onlyFansApp") {
        OnlyFans.open();
    }
};

function Scene_OnlyFans() {
    this.initialize.apply(this, arguments);
}

Scene_OnlyFans.prototype = Object.create(Scene_MenuBase.prototype);
Scene_OnlyFans.prototype.constructor = Scene_OnlyFans;

Scene_OnlyFans.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_OnlyFans.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createProfileWindow();
    this.createCommandWindow();
};

Scene_OnlyFans.prototype.createProfileWindow = function() {
    this._profileWindow = new Window_OnlyFansProfile();
    this.addWindow(this._profileWindow);
};

Scene_OnlyFans.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_OnlyFansCommand();
    this._commandWindow.setHandler("subscribe", this.subscribe.bind(this));
    this._commandWindow.setHandler("next", this.nextProfile.bind(this));
    this._commandWindow.setHandler("exit", this.exitApp.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_OnlyFans.prototype.subscribe = function() {
    var profile = OnlyFans.profiles[OnlyFans.currentIndex];
    if ($gameParty.gold() >= profile.price) {
        $gameParty.loseGold(profile.price);
        var subscribed = $gameVariables.value(10) || [];
        subscribed.push(profile.name);
        $gameVariables.setValue(10, subscribed);
        SoundManager.playShop();
    } else {
        SoundManager.playBuzzer();
    }
    this._profileWindow.refresh();
    this._commandWindow.refresh();
};

Scene_OnlyFans.prototype.nextProfile = function() {
    OnlyFans.currentIndex = (OnlyFans.currentIndex + 1) % OnlyFans.profiles.length;
    this._profileWindow.refresh();
    this._commandWindow.refresh();
};

Scene_OnlyFans.prototype.exitApp = function() {
    Phone.Show(); // Regresar al menú del teléfono
};

function Window_OnlyFansProfile() {
    this.initialize.apply(this, arguments);
}

Window_OnlyFansProfile.prototype = Object.create(Window_Base.prototype);
Window_OnlyFansProfile.prototype.constructor = Window_OnlyFansProfile;

Window_OnlyFansProfile.prototype.initialize = function() {
    var width = Graphics.boxWidth - 200;
    var height = 250;
    Window_Base.prototype.initialize.call(this, 100, 100, width, height);
    this._profileSprite = new Sprite();
    this.addChild(this._profileSprite);
    this.refresh();
};

Window_OnlyFansProfile.prototype.refresh = function() {
    this.contents.clear();
    var profile = OnlyFans.profiles[OnlyFans.currentIndex];
    this.drawText(profile.name, 20, 10, this.contents.width - 40, "center");
    this.drawText("Costo: " + profile.price + "G", 20, 40, this.contents.width - 40, "center");
    this.drawText("Oro: " + $gameParty.gold() + "G", 20, 70, this.contents.width - 40, "center");
    if (this._profileSprite.bitmap) {
        this.removeChild(this._profileSprite);
    }
    this._profileSprite = new Sprite(ImageManager.loadPicture(profile.image));
    this._profileSprite.x = this.width / 2 - 50;
    this._profileSprite.y = 100;
    this.addChild(this._profileSprite);
};

function Window_OnlyFansCommand() {
    this.initialize.apply(this, arguments);
}

Window_OnlyFansCommand.prototype = Object.create(Window_Command.prototype);
Window_OnlyFansCommand.prototype.constructor = Window_OnlyFansCommand;

Window_OnlyFansCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, Graphics.boxWidth / 2 - 100, 380);
};

Window_OnlyFansCommand.prototype.makeCommandList = function() {
    this.addCommand("Suscribirse", "subscribe");
    this.addCommand("Siguiente Perfil", "next");
    this.addCommand("Salir", "exit");
};
