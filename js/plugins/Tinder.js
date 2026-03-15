var Tinder = Tinder || {};
Tinder.profiles = [
    { id: 1, name: "Elena", description: "Aventurera en busca de emociones", image: "ElenaProfile" },
    { id: 2, name: "Carlos", description: "Guardián del bosque encantado", image: "CarlosProfile" }
];
Tinder.currentProfileIndex = 0;
Tinder.matches = [];

Tinder.launch = function() {
    if (!this.window) {
        this.createWindow();
    }
    SceneManager._scene.addChild(this.window);
    SceneManager._scene.setChildIndex(this.window, SceneManager._scene.children.length - 1);
    this.window.showProfile();
};

Tinder.createWindow = function() {
    this.window = new Window_Tinder();
};

Tinder.close = function() {
    if (this.window) {
        SceneManager._scene.removeChild(this.window);
        this.window = null;
    }
};

function Window_Tinder() {
    this.initialize.apply(this, arguments);
}

Window_Tinder.prototype = Object.create(Window_Base.prototype);
Window_Tinder.prototype.constructor = Window_Tinder;

Window_Tinder.prototype.initialize = function() {
    var width = Graphics.boxWidth - 200;
    var height = Graphics.boxHeight - 200;
    Window_Base.prototype.initialize.call(this, 100, 100, width, height);
    this.opacity = 255;
    this.setInteractive(true);
    this.createProfileCard();
    this.createButtons();
    this.createCloseButton();
};

Window_Tinder.prototype.createProfileCard = function() {
    this._profilePicture = new Sprite();
    this._profilePicture.x = this.width / 2 - 50;
    this._profilePicture.y = 50;
    this.addChild(this._profilePicture);
    this._profileName = new PIXI.Text("", { fill: "white" });
    this._profileName.x = 20;
    this._profileName.y = 150;
    this.addChild(this._profileName);
    this._profileDescription = new PIXI.Text("", { fill: "white" });
    this._profileDescription.x = 20;
    this._profileDescription.y = 180;
    this.addChild(this._profileDescription);
    this.showProfile();
};

Window_Tinder.prototype.createButtons = function() {
    this._likeButton = new Sprite(ImageManager.loadPicture("LikeButton"));
    this._dislikeButton = new Sprite(ImageManager.loadPicture("DislikeButton"));
    
    this._likeButton.x = this.width - 100;
    this._likeButton.y = this.height - 50;
    this._dislikeButton.x = 50;
    this._dislikeButton.y = this.height - 50;
    
    this._likeButton.interactive = true;
    this._likeButton.buttonMode = true;
    this._dislikeButton.interactive = true;
    this._dislikeButton.buttonMode = true;
    
    this._likeButton.on('pointertap', this.handleLike.bind(this));
    this._dislikeButton.on('pointertap', this.handleDislike.bind(this));
    
    this.addChild(this._likeButton);
    this.addChild(this._dislikeButton);
};

Window_Tinder.prototype.createCloseButton = function() {
    this._closeButton = new Sprite(ImageManager.loadPicture("CloseButton"));
    this._closeButton.x = this.width - 50;
    this._closeButton.y = 10;
    this._closeButton.interactive = true;
    this._closeButton.buttonMode = true;
    this._closeButton.on('pointertap', Tinder.close.bind(Tinder));
    this.addChild(this._closeButton);
};

Window_Tinder.prototype.showProfile = function() {
    if (Tinder.currentProfileIndex >= Tinder.profiles.length) {
        this._profileName.text = "No hay más perfiles";
        this._profileDescription.text = "Vuelve más tarde";
        this._profilePicture.bitmap = null;
        return;
    }
    let profile = Tinder.profiles[Tinder.currentProfileIndex];
    this._profileName.text = profile.name;
    this._profileDescription.text = profile.description;
    this._profilePicture.bitmap = ImageManager.loadPicture(profile.image);
};

Window_Tinder.prototype.handleLike = function() {
    let profile = Tinder.profiles[Tinder.currentProfileIndex];
    Tinder.matches.push(profile);
    $gameVariables.setValue(10, Tinder.matches.map(p => p.id));
    console.log("Te gustó: " + profile.name);
    this.nextProfile();
};

Window_Tinder.prototype.handleDislike = function() {
    console.log("No te gustó: " + Tinder.profiles[Tinder.currentProfileIndex].name);
    this.nextProfile();
};

Window_Tinder.prototype.nextProfile = function() {
    Tinder.currentProfileIndex++;
    this.showProfile();
};
