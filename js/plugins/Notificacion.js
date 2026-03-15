(function() {
    const npcIds = [1, 2, 3, 4, 5]; 
    const baseVariables = {
        "Confianza": 100,
        "Lujuria": 200,
        "Corrupción": 300
    };

    let previousValues = {};
    let notifications = [];

    function showFloatingNotification(text) {
        notifications.push({ text, time: 120 }); // 120 frames (~2 segundos)
    }

    function checkVariables() {
        if (!$gameVariables || !$gameVariables._data) return;

        for (const [nombre, baseId] of Object.entries(baseVariables)) {
            for (const npcId of npcIds) {
                const variableId = baseId + npcId;

                if (!$gameVariables._data.hasOwnProperty(variableId)) {
                    $gameVariables._data[variableId] = 0;
                }

                let newValue = $gameVariables.value(variableId);
                let oldValue = previousValues[variableId] || 0;

                if (newValue !== oldValue) {
                    let difference = newValue - oldValue;
                    let sign = difference > 0 ? "+" : "";
                    let message = `${nombre} ${sign}${difference}`;

                    showFloatingNotification(message);
                    previousValues[variableId] = newValue;
                }
            }
        }
    }

    function drawNotifications() {
        if (!SceneManager._scene || !SceneManager._scene._notificationSprite) return;

        let sprite = SceneManager._scene._notificationSprite;
        let bitmap = sprite.bitmap;
        bitmap.clear();

        let baseY = Graphics.height - 250; // Subido 200px más arriba en total
        notifications.forEach((notif, index) => {
            let y = baseY - (index * 36);
            let x = Graphics.width - 310;
            bitmap.drawText(notif.text, x, y, 300, 32, "right");
            notif.time--;
        });

        notifications = notifications.filter(n => n.time > 0);
    }

    const alias_Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        alias_Scene_Map_createDisplayObjects.call(this);
        this._notificationSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._notificationSprite);
    };

    const alias_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        alias_Scene_Map_update.call(this);
        drawNotifications();
    };

    setInterval(checkVariables, 500);
})();
