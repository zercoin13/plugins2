/*:
 * @plugindesc Controla inventarios, dinero y sprite independientes por personaje usando interruptores 201-205 y variables desde la 501. Cada personaje tiene 100 variables asignadas. Cambia automáticamente el sprite del personaje principal al cambiar.
 * @author ChatGPT
 */

(() => {
  const baseVariable = 501;
  const variablesPerChar = 100;
  const characterSwitches = [201, 202, 203, 204, 205];

  let currentCharId = -1;

  function getActiveCharacterId() {
    for (let i = 0; i < characterSwitches.length; i++) {
      if ($gameSwitches.value(characterSwitches[i])) {
        return i + 1; // Personaje 1–5
      }
    }
    return -1; // Ningún personaje activo
  }

  function getVarIndex(charId, offset) {
    return baseVariable + (charId - 1) * variablesPerChar + offset;
  }

  function saveCharacterInventory(charId) {
    if (charId < 1) return;
    for (let i = 0; i < variablesPerChar - 1; i++) {
      const item = $dataItems[i + 1];
      if (item) {
        const amount = $gameParty.numItems(item);
        $gameVariables.setValue(getVarIndex(charId, i), amount);
      }
    }
    $gameVariables.setValue(getVarIndex(charId, 99), $gameParty.gold());
  }

  function loadCharacterInventory(charId) {
    if (charId < 1) return;
    $gameParty.initAllItems();
    for (let i = 0; i < variablesPerChar - 1; i++) {
      const item = $dataItems[i + 1];
      const amount = $gameVariables.value(getVarIndex(charId, i));
      if (item && amount > 0) {
        $gameParty.gainItem(item, amount);
      }
    }
    $gameParty._gold = $gameVariables.value(getVarIndex(charId, 99));
  }

  Game_Interpreter.prototype.changeActiveCharacter = function(newCharId) {
    if (currentCharId > 0) {
      saveCharacterInventory(currentCharId);
    }

    currentCharId = newCharId;
    for (let i = 0; i < characterSwitches.length; i++) {
      $gameSwitches.setValue(characterSwitches[i], i === (newCharId - 1));
    }

    loadCharacterInventory(newCharId);
    $gameVariables.setValue(500, newCharId); // Guarda ID activo

    // Cambiar sprite del personaje principal
    const actor = $gameActors.actor(newCharId);
    if (actor) {
      const charName = actor.characterName();
      const charIndex = actor.characterIndex();
      const player = $gamePlayer;

      player.setImage(charName, charIndex);
    }

    console.log(`Cambio a personaje ${newCharId}`);
  };

  // Inicializa el personaje activo al cargar el mapa
  const alias_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function() {
    alias_onMapLoaded.call(this);
    const id = getActiveCharacterId();
    if (id > 0 && id !== currentCharId) {
      currentCharId = id;
      loadCharacterInventory(id);

      // Cambiar sprite al cargar
      const actor = $gameActors.actor(id);
      if (actor) {
        const charName = actor.characterName();
        const charIndex = actor.characterIndex();
        $gamePlayer.setImage(charName, charIndex);
      }
    }
  };
})();
