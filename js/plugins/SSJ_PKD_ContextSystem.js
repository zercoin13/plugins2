/*:
 * @plugindesc SSJ PKD Context System v1.4 - Fix definitivo usando estructura real de PKD
 * @author SSJ
 *
 * @help
 * ============================================================================
 * v1.4
 * - Usa propiedad real scene._wallpaper
 * - Reordena dentro de scene._phoneContent
 * - Fix estructural definitivo
 * - Sin escaneos recursivos
 * ============================================================================
 */

var Imported = Imported || {};
Imported.SSJ_PKD_ContextSystem = true;

var SSJ = SSJ || {};
SSJ.Phone = SSJ.Phone || {};

(function(){

// ============================================================================
// VARIABLES
// ============================================================================

SSJ.Phone._profiles = {};
SSJ.Phone._currentOwner = "player";
SSJ.Phone._previousOwner = null;
SSJ.Phone._returnOwner = null;
SSJ.Phone._isContextActive = false;
SSJ.Phone._isRestoring = false;
SSJ.Phone._debug = true;
SSJ.Phone._needsWallpaperFix = false;

// ============================================================================
// DEBUG
// ============================================================================

SSJ.Phone.debugLog = function(text) {
    if (this._debug) {
        console.log("SSJ_PKD_ContextSystem:", text);
    }
};

// ============================================================================
// DEFINIR PERFIL
// ============================================================================

SSJ.Phone.define = function(id, config) {
    this._profiles[id] = {
        phoneImage: config.phoneImage || null,
        wallpaper: config.wallpaper || null,
        apps: config.apps ? config.apps.slice() : []
    };
};

// ============================================================================
// OPEN TEMPORARY
// ============================================================================

SSJ.Phone.openTemporary = function(config) {
    if (!config || !config.id) return;
    this.define(config.id, config);
    this.open(config.id);
};

// ============================================================================
// APPLY PROFILE
// ============================================================================

SSJ.Phone.applyProfile = function(id) {

    if (!this._profiles[id]) return;

    var profile = this._profiles[id];

    if (profile.phoneImage) {
        Phone.ChangePhone(profile.phoneImage);
    }

    if (profile.wallpaper) {
        Phone.ChangeWallpaper(profile.wallpaper);
        this._needsWallpaperFix = true;
    }

    this.resetAllApps();

    for (var i = 0; i < profile.apps.length; i++) {
        Phone.AddApp(profile.apps[i]);
    }

    this._currentOwner = id;
};

// ============================================================================
// RESET APPS
// ============================================================================

SSJ.Phone._possibleApps = [
    "messagesApp","galleryApp","contactsApp","saveApp","loadApp",
    "settingsApp","statusApp","notesApp","browserApp","cameraApp",
    "app11","app12","app13","app14","app15",
    "app16","app17","app18","app19","app20"
];

SSJ.Phone.resetAllApps = function() {
    for (var i = 0; i < this._possibleApps.length; i++) {
        Phone.RemoveApp(this._possibleApps[i]);
    }
};

// ============================================================================
// OPEN
// ============================================================================

SSJ.Phone.open = function(id) {

    if (!this._profiles[id]) return;

    this._previousOwner = this._currentOwner;
    this._returnOwner = this._previousOwner;
    this._isContextActive = true;

    this.applyProfile(id);

    Phone.Show();
};

// ============================================================================
// RESTORE
// ============================================================================

SSJ.Phone.restore = function() {

    if (!this._isContextActive) return;
    if (this._isRestoring) return;

    this._isRestoring = true;

    if (this._returnOwner) {
        this.applyProfile(this._returnOwner);
    }

    this._isContextActive = false;
    this._previousOwner = null;
    this._returnOwner = null;

    this._isRestoring = false;
};

// ============================================================================
// FIX DIRECTO USANDO _wallpaper
// ============================================================================

SSJ.Phone.fixWallpaperLayer = function(scene) {

    if (!this._needsWallpaperFix) return;
    if (!scene) return;
    if (!scene._wallpaper) return;
    if (!scene._phoneContent) return;

    var wallpaper = scene._wallpaper;
    var container = scene._phoneContent;

    if (container.children.indexOf(wallpaper) > 0) {

        container.removeChild(wallpaper);
        container.addChildAt(wallpaper, 0);

        this.debugLog("Wallpaper movido al índice 0 dentro de _phoneContent");
    }

    this._needsWallpaperFix = false;
};

// ============================================================================
// HOOK UPDATE
// ============================================================================

var _SSJ_SceneManager_update_v5 = SceneManager.update;

SceneManager.update = function() {

    _SSJ_SceneManager_update_v5.call(this);

    if (!SSJ.Phone._isContextActive) return;

    var scene = SceneManager._scene;
    if (!scene) return;

    if (scene.constructor.name === "PKD_ScenePhone") {

        SSJ.Phone.fixWallpaperLayer(scene);

    } else {

        SSJ.Phone.restore();
    }
};

// ============================================================================
// PERFIL BASE JUGADOR
// ============================================================================

SSJ.Phone.define("player", {
    phoneImage: "Phone_Default",
    wallpaper: "Wallpaper1",
    apps: [
        "messagesApp",
        "galleryApp",
        "contactsApp",
        "saveApp",
        "loadApp",
        "settingsApp"
    ]
});

})();