/*:
 * @plugindesc OnlySubs - Sistema de venta de fotos (Jugador Vendedor) v1.0
 * @author FV
 */

var Imported = Imported || {};
Imported.FV_OnlyFans_System = true;

// Declaración global obligatoria
var $gameOnlyFans = null;

(function() {


// =============================
// GAME OBJECT
// =============================

function Game_OnlyFans() {
    this.initialize.apply(this, arguments);
}

Game_OnlyFans.prototype.initialize = function() {
    this._posts = [];
};

Game_OnlyFans.prototype.addPost = function(post) {
    this._posts.push(post);
};

Game_OnlyFans.prototype.posts = function() {
    return this._posts;
};


// =============================
// SAVE SYSTEM
// =============================

var _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    $gameOnlyFans = new Game_OnlyFans();
};

var _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.onlyFans = $gameOnlyFans;
    return contents;
};

var _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.call(this, contents);
    $gameOnlyFans = contents.onlyFans || new Game_OnlyFans();
};


// =============================
// NOTETAGS
// =============================

function isOnlyFansItem(item) {
    if (!item || !item.note) return false;
    return item.note.indexOf("<OnlySubsPost>") >= 0;
}

function getPrice(item) {
    var match = item.note.match(/price:\s*(\d+)/i);
    return match ? Number(match[1]) : 0;
}

function getImage(item) {
    var match = item.note.match(/image:\s*(.+)/i);
    return match ? match[1].trim() : "";
}


// =============================
// MAIN SCENE
// =============================

function Scene_OnlyFans() {
    this.initialize.apply(this, arguments);
}

Scene_OnlyFans.prototype = Object.create(Scene_MenuBase.prototype);
Scene_OnlyFans.prototype.constructor = Scene_OnlyFans;

Scene_OnlyFans.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
};

Scene_OnlyFans.prototype.createCommandWindow = function() {

    this._commandWindow = new Window_Command(0, 0);
    this._commandWindow.windowWidth = function() {
        return 300;
    };

    this._commandWindow.addCommand("Publicar Foto", "publish");
    this._commandWindow.addCommand("Ver Publicaciones", "view");
    this._commandWindow.addCommand("Salir", "cancel");

    this._commandWindow.setHandler("publish", this.commandPublish.bind(this));
    this._commandWindow.setHandler("view", this.commandView.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));

    this.addWindow(this._commandWindow);
};

Scene_OnlyFans.prototype.commandPublish = function() {
    SceneManager.push(Scene_PublishPhoto);
};

Scene_OnlyFans.prototype.commandView = function() {
    SceneManager.push(Scene_ViewPosts);
};


// =============================
// PUBLISH SCENE
// =============================

function Scene_PublishPhoto() {
    this.initialize.apply(this, arguments);
}

Scene_PublishPhoto.prototype = Object.create(Scene_ItemBase.prototype);
Scene_PublishPhoto.prototype.constructor = Scene_PublishPhoto;

Scene_PublishPhoto.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createItemWindow();
};

Scene_PublishPhoto.prototype.createItemWindow = function() {

    this._itemWindow = new Window_ItemList(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._itemWindow.setCategory("item");

    this._itemWindow.includes = function(item) {
        return isOnlyFansItem(item);
    };

    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.popScene.bind(this));

    this._itemWindow.refresh();
    this.addWindow(this._itemWindow);
};

Scene_PublishPhoto.prototype.onItemOk = function() {

    var item = this._itemWindow.item();
    if (!item) return;

    var price = getPrice(item);
    var image = getImage(item);

    $gameOnlyFans.addPost({
        name: item.name,
        price: price,
        image: image
    });

    // Dinero independiente en variable 2002
    var currentMoney = $gameVariables.value(2002);
    $gameVariables.setValue(2002, currentMoney + price);

    $gameParty.loseItem(item, 1);

    this._itemWindow.refresh();
};


// =============================
// VIEW POSTS
// =============================

function Scene_ViewPosts() {
    this.initialize.apply(this, arguments);
}

Scene_ViewPosts.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ViewPosts.prototype.constructor = Scene_ViewPosts;

Scene_ViewPosts.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindow();
};

Scene_ViewPosts.prototype.createWindow = function() {

    this._window = new Window_Base(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.addWindow(this._window);

    var posts = $gameOnlyFans.posts();
    var y = 0;

    for (var i = 0; i < posts.length; i++) {

        var post = posts[i];

        this._window.drawText(post.name + " - $" + post.price, 0, y, Graphics.boxWidth);
        y += this._window.lineHeight();

        if (post.image) {
            var bitmap = ImageManager.loadPicture(post.image);
            this._window.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, y);
            y += bitmap.height + 10;
        }
    }
};


// =============================
// PLUGIN COMMAND
// =============================

var _FV_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {

    _FV_pluginCommand.call(this, command, args);

    if (command.toLowerCase() === "openonlyfans") {
        SceneManager.goto(Scene_OnlyFans);
    }
};

})();
