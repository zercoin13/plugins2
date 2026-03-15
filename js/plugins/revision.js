(function() {
    function checkSwitchDependencies() {
        let switchUsage = {};

        // Recorre todos los mapas
        for (let mapId = 1; mapId <= $dataSystem.switches.length; mapId++) {
            let mapData = null;
            try {
                mapData = require(`data/Map${mapId.toString().padStart(3, '0')}.json`);
            } catch (e) {
                continue; // Si el mapa no existe, pasa al siguiente
            }

            if (mapData.events) {
                mapData.events.forEach(event => {
                    if (event && event.pages) {
                        event.pages.forEach(page => {
                            if (page.conditions) {
                                let conditions = page.conditions;

                                // Verificar si usa un interruptor
                                if (conditions.switch1Valid) {
                                    let switchId = conditions.switch1Id;
                                    switchUsage[switchId] = switchUsage[switchId] || [];
                                    switchUsage[switchId].push(`Mapa ${mapId} - Evento ${event.id} - Página ${page.index + 1}`);
                                }
                                if (conditions.switch2Valid) {
                                    let switchId = conditions.switch2Id;
                                    switchUsage[switchId] = switchUsage[switchId] || [];
                                    switchUsage[switchId].push(`Mapa ${mapId} - Evento ${event.id} - Página ${page.index + 1}`);
                                }
                            }
                        });
                    }
                });
            }
        }

        console.log("Dependencias de Interruptores:", switchUsage);
        return switchUsage;
    }

    window.checkSwitchDependencies = checkSwitchDependencies;
})();
