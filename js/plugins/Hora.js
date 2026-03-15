// Registrar un Listener para detectar la tecla H
document.addEventListener('keydown', function(event) {
    if (event.key === 'h' || event.key === 'H') { // Detecta H o h
        $gameTime.addHour(1); // Sumar una hora
        var hora = $gameTime.hour; // Obtener la hora actual
        $gameMessage.add(`La hora es ${hora}`); // Mostrar mensaje
    }
});
