/*:
 * @plugindesc SocialCore – Núcleo social del juego (mensajes, perfiles, galería, dinero)
 * @author Tú
 * @help
 * NO UI – NO ESCENAS – SOLO LÓGICA
 */

(() => {

  const SocialCore = {};
  window.SocialCore = SocialCore;

  // ==============================
  // CONFIG
  // ==============================
  SocialCore.Config = {
    MAX_PROFILES: 1000,
    VAR_BASE_PROFILE: 1001,
    VAR_PROFILE_SIZE: 10,
    VAR_CASH: 10000,
    VAR_DIGITAL: 10001
  };

  // ==============================
  // UTILIDADES
  // ==============================
  SocialCore._varId = function(profileId, offset) {
    return this.Config.VAR_BASE_PROFILE + (profileId * this.Config.VAR_PROFILE_SIZE) + offset;
  };

  // ==============================
  // PERFILES / CONTACTOS
  // ==============================
  SocialCore.Profiles = {

    exists(id) {
      return $gameVariables.value(SocialCore._varId(id, 0)) === 1;
    },

    unlock(id) {
      $gameVariables.setValue(SocialCore._varId(id, 0), 1);
    },

    isKnown(id) {
      return this.exists(id);
    },

    getAffinity(id) {
      return $gameVariables.value(SocialCore._varId(id, 1)) || 0;
    },

    addAffinity(id, value) {
      const v = this.getAffinity(id) + value;
      $gameVariables.setValue(SocialCore._varId(id, 1), v);
    },

    unreadMessages(id) {
      return $gameVariables.value(SocialCore._varId(id, 2)) || 0;
    },

    addUnread(id) {
      const v = this.unreadMessages(id) + 1;
      $gameVariables.setValue(SocialCore._varId(id, 2), v);
    },

    clearUnread(id) {
      $gameVariables.setValue(SocialCore._varId(id, 2), 0);
    }
  };

  // ==============================
  // MENSAJES
  // ==============================
  SocialCore.Messages = {

    _data: {},

    _ensureThread(id) {
      if (!this._data[id]) this._data[id] = [];
    },

    send(profileId, text, image = null) {
      this._ensureThread(profileId);
      this._data[profileId].push({
        from: profileId,
        text,
        image,
        time: Date.now(),
        read: false
      });
      SocialCore.Profiles.addUnread(profileId);
    },

    getThread(profileId) {
      this._ensureThread(profileId);
      return this._data[profileId];
    },

    markAllRead(profileId) {
      this._ensureThread(profileId);
      this._data[profileId].forEach(m => m.read = true);
      SocialCore.Profiles.clearUnread(profileId);
    }
  };

  // ==============================
  // GALERÍA
  // ==============================
  SocialCore.Gallery = {

    _unlocked: {},

    unlock(profileId, imageName) {
      if (!this._unlocked[profileId]) {
        this._unlocked[profileId] = [];
      }
      if (!this._unlocked[profileId].includes(imageName)) {
        this._unlocked[profileId].push(imageName);
      }
    },

    get(profileId) {
      return this._unlocked[profileId] || [];
    }
  };

  // ==============================
  // ECONOMÍA
  // ==============================
  SocialCore.Economy = {

    cash() {
      return $gameVariables.value(SocialCore.Config.VAR_CASH) || 0;
    },

    digital() {
      return $gameVariables.value(SocialCore.Config.VAR_DIGITAL) || 0;
    },

    addCash(value) {
      $gameVariables.setValue(
        SocialCore.Config.VAR_CASH,
        this.cash() + value
      );
    },

    addDigital(value) {
      $gameVariables.setValue(
        SocialCore.Config.VAR_DIGITAL,
        this.digital() + value
      );
    }
  };

})();

// ==============================
// SAVE / LOAD
// ==============================
const _makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  const contents = _makeSaveContents.call(this);
  contents.socialCore = {
    messages: SocialCore.Messages._data,
    gallery: SocialCore.Gallery._unlocked
  };
  return contents;
};

const _extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  _extractSaveContents.call(this, contents);
  if (contents.socialCore) {
    SocialCore.Messages._data = contents.socialCore.messages || {};
    SocialCore.Gallery._unlocked = contents.socialCore.gallery || {};
  }
};

