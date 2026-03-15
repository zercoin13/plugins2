/*:
 * @plugindesc Agenda mejorada para RPG Maker MV con mejor gestión de imágenes, interactividad y UI optimizada.
 * @author ChatGPT
 */

(function() {
    // Definimos la escena de la agenda.
    function Scene_Agenda() {
        this.initialize.apply(this, arguments);
    }

    Scene_Agenda.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Agenda.prototype.constructor = Scene_Agenda;

    Scene_Agenda.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    // Creación de la ventana de la agenda
    Scene_Agenda.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createWindowLayer();
        this._agendaWindow = new Window_Agenda();
        this.addWindow(this._agendaWindow);
    };

    // Permite salir de la agenda con la tecla de cancelar
    Scene_Agenda.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered('cancel')) {
            SceneManager.pop();
        }
    };

    // Definimos la ventana de la agenda
    function Window_Agenda() {
        this.initialize.apply(this, arguments);
    }

    Window_Agenda.prototype = Object.create(Window_Selectable.prototype);
    Window_Agenda.prototype.constructor = Window_Agenda;

    Window_Agenda.prototype.initialize = function() {
        Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._npcBitmaps = {}; // Almacena imágenes precargadas
        this._npcs = this.getVisibleNpcs() || []; // Evita que _npcs sea undefined
        this.preloadImages(); // Precarga imágenes para evitar retrasos
        this.refresh();
        this.activate();
    };

    // Obtiene la lista de NPCs visibles en la agenda
    Window_Agenda.prototype.getVisibleNpcs = function() {
        if (!$gameParty || !$dataItems) return [];
        let npcs = [
            { id: 1, name: "Chanel", image: "Chanel", itemId: 10 },
            { id: 2, name: "August", image: "AugustA", itemId: 11 },
            { id: 3, name: "Anya", image: "Anya", itemId: 12 },
            { id: 4, name: "Danny", image: "Danny", itemId: 13 },
            { id: 5, name: "Coco", image: "Coco", itemId: 14 },
            { id: 6, name: "Pavel", image: "Pavel", itemId: 15 },
            { id: 7, name: "Ava", image: "Ava", itemId: 16 },
            { id: 8, name: "Xander", image: "Xander", itemId: 17 },
            { id: 9, name: "Dillion", image: "Dillion", itemId: 18 },
            { id: 10, name: "Angela", image: "Angela", itemId: 19 }
        ];
        return npcs.filter(npc => $gameParty.hasItem($dataItems[npc.itemId])) || [];
    };

    // Precarga las imágenes de los NPCs para evitar retrasos
    Window_Agenda.prototype.preloadImages = function() {
        this._npcs.forEach(npc => {
            let bitmap = ImageManager.loadPicture(npc.image);
            bitmap.addLoadListener(() => {
                this._npcBitmaps[npc.id] = bitmap;
                this.refresh();
            });
        });
    };

    // Función para limitar valores entre un mínimo y un máximo
    Math.clamp = function(value, min, max) {
        return Math.max(min, Math.min(value, max));
    };

    // Número total de elementos en la agenda
    Window_Agenda.prototype.maxItems = function() {
        return this._npcs ? this._npcs.length : 0;
    };

    // Dibuja cada NPC en la lista con su imagen y estadísticas
    Window_Agenda.prototype.drawItem = function(index) {
        if (!this._npcs || !this._npcs[index]) return;
        const npc = this._npcs[index];

        const imgSize = 70; // Tamaño de la imagen
        const margin = 20; // Espacio extra entre filas
        const rowHeight = imgSize + margin; // Altura total de cada fila
        const offsetY = 30; // Desplazamiento inicial para bajar la primera fila
        const rect = this.itemRect(index);
        
        rect.y = index * rowHeight + offsetY; // Se aplica el desplazamiento extra
        const textX = rect.x + imgSize + 15; // Espacio entre imagen y texto

        this.contents.fontSize = 30; // Tamaño del texto

        let confianza = Math.clamp($gameVariables.value(100 + npc.id) || 0, 0, 100);
        let lujuria = Math.clamp($gameVariables.value(200 + npc.id) || 0, 0, 100);
        let corrupcion = Math.clamp($gameVariables.value(300 + npc.id) || 0, 0, 100);

        this.drawText(npc.name, textX, rect.y, 250, "left");
        this.drawText("Confianza", textX + 250, rect.y - 20, 120, "left");
        this.drawGauge(textX + 250, rect.y, 120, confianza / 100, "#00ff00", "#008000");
        this.drawText("Lujuria", textX + 390, rect.y - 20, 120, "left");
        this.drawGauge(textX + 390, rect.y, 120, lujuria / 100, "#ff00ff", "#800080");
        this.drawText("Corrupción", textX + 530, rect.y - 20, 120, "left");
        this.drawGauge(textX + 530, rect.y, 120, corrupcion / 100, "#ff0000", "#800000");
        this.drawText(`Ubicación: ${$gameVariables.value(400 + npc.id) || 'Desconocida'}`, textX + 670, rect.y, 250, "left");

        let bitmap = this._npcBitmaps[npc.id];
        if (bitmap) {
            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y + 10, imgSize, imgSize);
        }
    };

    // Agrega la opción "Agenda" al menú principal
    const alias_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        alias_addOriginalCommands.call(this);
        this.addCommand("Agenda", "agenda");
    };

    // Vincula la opción de "Agenda" al menú
    const alias_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        alias_Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("agenda", this.commandAgenda.bind(this));
    };

    // Abre la escena de la agenda al seleccionar la opción en el menú
    Scene_Menu.prototype.commandAgenda = function() {
        SceneManager.goto(Scene_Agenda);
    };
})();
