// Detectar la tecla "M" y ejecutar un evento común
document.addEventListener('keydown', function(event) {
    if (event.key === 'm' || event.key === 'M') { // Detecta M (minúscula o mayúscula)
        var commonEventId = 50; // Cambia este número al ID de tu evento común

        if ($gameMap && $gameMap.isEventRunning()) {
            // Si ya hay un evento corriendo, no hacer nada
            return;
        }

        if ($gameTemp && commonEventId) {
            $gameTemp.reserveCommonEvent(commonEventId); // Activa el evento común
        }
    }
});
